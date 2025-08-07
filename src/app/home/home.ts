import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getUpdatedNews().subscribe(news => {
      this.newsList = news;
    });

  }
}
