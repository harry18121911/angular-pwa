import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { News } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly apiUrl = 'http://localhost:3000/news';
  private readonly localStorageKey = 'cachedNews';
  private readonly localTimestampKey = 'lastUpdatedTimestamp';

  constructor(private http: HttpClient) {}

  getUpdatedNews(): Observable<News[]> {
    const lastTs = Number(localStorage.getItem(this.localTimestampKey)) || 0;
    const url = `${this.apiUrl}?ts_last_updated_gte=${lastTs}&_sort=ts_last_updated&_order=desc`;

    return this.http.get<News[]>(url).pipe(
      tap(serverNews => {
        const updatedNews = this.mergeAndClean(serverNews);
        this.saveToCache(updatedNews);

        // Update last updated timestamp from server data
        const newMaxTs = Math.max(...serverNews.map(n => n.ts_last_updated), lastTs);
        localStorage.setItem(this.localTimestampKey, String(newMaxTs));
      }),
      catchError(() => {
        const cached = this.getCachedNews();
        return of(cached);
      })
    );
  }

  private mergeAndClean(newData: News[]): News[] {
    const cached = this.getCachedNews();
    const mergedMap = new Map<string, News>();
    const now = Date.now();

    // Add valid cached items
    for (const item of cached) {
      if (!item.is_deleted && item.ts_expiration > now) {
        mergedMap.set(item.uuid, item);
      }
    }

    // Merge/replace with server items
    for (const item of newData) {
      if (!item.is_deleted && item.ts_expiration > now) {
        mergedMap.set(item.uuid, item);
      } else {
        mergedMap.delete(item.uuid);
      }
    }

    // Convert to array and sort
    return Array.from(mergedMap.values()).sort(
      (a, b) => b.ts_last_updated - a.ts_last_updated
    );
  }

  private saveToCache(news: News[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(news));
  }

  getCachedNews(): News[] {
    const cached = localStorage.getItem(this.localStorageKey);
    return cached ? JSON.parse(cached) : [];
  }
}
