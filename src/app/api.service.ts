import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, race } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://savesphere-backend.onrender.com/api';
  private secondURL: string = 'https://savesphere-backend-2.onrender.com/api';
  private localURL: string = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
  ) {
  }

  public requestProductsFromAPI(path: string = '/getProducts/'): Observable<any[]> {
    const primaryAPI = this.http.get<any[]>(this.baseURL + path)
    const secondaryAPI = this.http.get<any[]>(this.secondURL + path)
    return race(primaryAPI, secondaryAPI) as Observable<any[]>
  }

  public checkLoginCredentials(
    path: string = '/checkLoginCredentials/',
    fullname: string = ' ',
    password: string = ' '
  ): Observable<any> {
    const primaryAPI = this.http.get<any>(`${this.baseURL}${path}${fullname}/${password}`);
    const secondaryAPI = this.http.get<any>(`${this.secondURL}${path}${fullname}/${password}`);
    return race(primaryAPI, secondaryAPI) as Observable<any[]>;
  }

  public addUserActivityToLog(path: string): Observable<any> {
    const url = `${this.baseURL}/addUserActivityToLog/`;
    const data = { route: path, date: this.getCurrentTimeDE() };

    const primaryAPI = this.http.post<any>(url, data);
    const secondaryAPI = this.http.post<any>(url, data);
    return race(primaryAPI, secondaryAPI) as Observable<any[]>
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
    const primaryAPI = this.http.get<any[]>(`${this.baseURL}/getUserActivityLog/`);
    const secondaryAPI = this.http.get<any[]>(`${this.secondURL}/getUserActivityLog/`);
    return race(primaryAPI, secondaryAPI) as Observable<any[]>
  }
}
