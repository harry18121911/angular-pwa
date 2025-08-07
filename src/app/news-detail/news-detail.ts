import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  imports: [CommonModule, RouterLink],
  standalone:true,
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.css'
})

export class NewsDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  news?:News;

  ngOnInit():void{
    const uuid= this.route.snapshot.paramMap.get("uuid");
    if(uuid){
      this.newsService.getUpdatedNews().subscribe(newsList =>{
        this.news = newsList.find(n=>n.uuid ===uuid);
      })
    }
  }

}
