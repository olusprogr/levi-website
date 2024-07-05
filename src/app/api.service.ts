import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://savesphere-backend.onrender.com/api';
  private secondURL: string = 'http://localhost:3000/api'

  constructor(
    private http: HttpClient,
  ) {
    this.baseURL = this.secondURL;
  }

  public requestProductsFromAPI(path: string = '/getProducts/'): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + path);
  }

  public checkLoginCredentials(
    path: string = '/checkLoginCredentials/',
    fullname: string = ' ',
    password: string = ' '
  ): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${path}${fullname}/${password}`);
  }

  public addUserActivityToLog(path: string): Observable<any> {
    const url = `${this.baseURL}/addUserActivityToLog/`;
    const data = { route: path, date: this.getCurrentTimeDE() };

    return this.http.post<any>(url, data);
  }

  private getCurrentTimeDE(): string {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    return now.toLocaleString('de-DE', options);
  }

  public requestUserActivityLog(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getUserActivityLog/`);
  }
}
