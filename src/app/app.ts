import { Component,  signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,Sidebar],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

  protected readonly title = signal('AngularPWA');

}
