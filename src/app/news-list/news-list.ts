import { Component } from '@angular/core';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-news-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './news-list.html',
  styleUrl: './news-list.css'
})
export class NewsList {
newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getUpdatedNews().subscribe(news => {
      this.newsList = news;
    });

  }
}
