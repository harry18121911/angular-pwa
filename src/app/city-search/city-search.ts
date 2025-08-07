import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { City } from '../models/city.model';

@Component({
  selector: 'app-city-search',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './city-search.html',
  styleUrl: './city-search.css'
})
export class CitySearchComponent implements OnInit {
  searchControl = new FormControl('');
  allCities: City[] = [];
  filteredCities$: Observable<City[]> = of([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<City[]>('/cities.json').subscribe(data => {
      this.allCities = data;

      this.filteredCities$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        map(value => this.filterCities(value || ''))
      );
    });
  }

  private filterCities(value: string): City[] {
    const lower = value.toLowerCase();
    return this.allCities
      .filter(city => city.Name.toLowerCase().includes(lower))
      .slice(0, 10); // Limit to 10 results
  }
}
