import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = "http://localhost:3000/news";

  constructor(private http:HttpClient){}

  getAllNews(): Observable<News[]>{
    return this.http.get<News[]>(this.apiUrl);
  }

  getNewsSince(timestamp:number): Observable<News[]>{
    return this.http.get<News[]>(`${this.apiUrl}?ts_last_update_gte=${timestamp}`);
  }

}
