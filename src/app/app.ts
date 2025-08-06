import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsService } from './services/news.service';
import { News } from './models/news.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  newsList: News [] = [];

  constructor(private newsService:NewsService){}

  protected readonly title = signal('AngularPWA');

  ngOnInit():void{
  this.newsService.getAllNews().subscribe(data=>{
    this.newsList = data;
  })

  }


}
