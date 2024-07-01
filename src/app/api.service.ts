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
  ) { }

  public requestProductsFromAPI(path: string = '/getProducts/'): Observable<any[]> {
    return this.http.get<any[]>(this.secondURL + path);
  }

  public checkLoginCredentials(
    path: string = '/checkLoginCredentials/',
    fullname: string = ' ',
    password: string = ' '
  ): Observable<any> {
    return this.http.get<any>(`${this.secondURL}${path}${fullname}/${password}`);
  }
}
