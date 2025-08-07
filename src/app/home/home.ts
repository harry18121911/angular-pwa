import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CitySearchComponent } from '../city-search/city-search';
import { Sidebar } from '../sidebar/sidebar';
import { WeatherService } from '../services/weather';
import { Authsmn } from '../services/authsmn';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CitySearchComponent, Sidebar],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(private authsmn: Authsmn, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getForecastByLocation(8727).subscribe({
      next: (data) => {
        console.log('Forecast data:', data);
      },
      error: (err) => {
        console.error('Error fetching forecast:', err);
      }
    })
  }

  public toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let backdrop = document.getElementById("backdrop");
    if (sidebar && backdrop) {
      sidebar.classList.toggle("hidden")
      backdrop.classList.toggle("hidden")
    }

  }
}


;

