import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authsmn{
  private readonly tokenUrl = 'http://10.3.138.138:8000/api/v1/core/smn-token/';
  private readonly localStorageKey = 'smnToken';

  constructor(private http: HttpClient) {}

  async fetchAndStoreToken(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ token: string }>(this.tokenUrl, {
          headers: { accept: '*/*' },
        })
      );

      if (response?.token) {
        localStorage.setItem(this.localStorageKey, response.token);
        console.log('Token saved to localStorage');
      }
    } catch (error) {
      console.error('Failed to fetch SMN token:', error);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
