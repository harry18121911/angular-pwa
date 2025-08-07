import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authsmn } from './authsmn';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly BASE_URL = 'https://ws1.smn.gob.ar/v1';

  constructor(private http: HttpClient, private authSmn: Authsmn) {}

  getForecastByLocation(locationId: number): Observable<any> {
    const token = this.authSmn.getToken(); // Retrieve the JWT from localStorage
    if (!token) {
      throw new Error('SMN token is missing.');
    }

    const headers = {
      Authorization: `JWT ${token}`
    };

    return this.http.get(`${this.BASE_URL}/forecast/location/${locationId}`, { headers });
  }
}
