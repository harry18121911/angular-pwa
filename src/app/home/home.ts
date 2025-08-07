import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CitySearchComponent } from '../city-search/city-search';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CitySearchComponent,Sidebar ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


  public toggleSidebar(){
    let sidebar= document.getElementById("sidebar");
    if(sidebar){
      sidebar.classList.toggle("hidden")
    }
  }
}
