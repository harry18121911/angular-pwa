import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private readonly apiUrl = "http://localhost:3000/news";
  private readonly localStorageKey = 'cachedNews';
  private http = inject(HttpClient);
  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl).pipe(
      tap(news => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(news));
      }),
      catchError(() => {
        const cached = localStorage.getItem(this.localStorageKey);
        if (cached) {
          const news = JSON.parse(cached) as News[];
          return of(news);
        } else {
          return of([]);
        }
      })
    );
  }

  getNewsSince(timestamp: number): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}?ts_last_update_gte=${timestamp}`);
  }

  getCachedNews(): News[] {
    const cached = localStorage.getItem(this.localStorageKey);
    return cached ? JSON.parse(cached) : [];
  }
}
