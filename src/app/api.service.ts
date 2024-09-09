import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, race } from 'rxjs';

type Product = {
  id: number;
  name: string;
  description: string;
  img: string;
  categories: string[];
  link: string;
  price: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://savesphere-backend.onrender.com/api';
  private secondURL: string = 'https://savesphere-backend-2.onrender.com/api';
  private thirdURL: string = 'http://ec2-35-159-168-222.eu-central-1.compute.amazonaws.com:3000/api';

  private localURL: string = 'http://localhost:3000/api';

  
  constructor(
    private http: HttpClient,
  ) {
    // this.baseURL = this.localURL
    // this.secondURL = this.localURL
    // this.thirdURL = this.localURL
  }

  public requestProductsFromAPI(): Observable<Product[]> {
    const path: string = '/getProducts/'

    const primaryAPI = this.http.get<any[]>(this.baseURL + path)
    const secondaryAPI = this.http.get<any[]>(this.secondURL + path)
    const tertiaryAPI = this.http.get<any[]>(this.thirdURL + path)
    return race(primaryAPI, secondaryAPI, tertiaryAPI) as Observable<Product[]>
  }

  public checkLoginCredentials(
    fullname: string = ' ',
    password: string = ' '
  ): Observable<boolean> {
    const path: string = '/checkLoginCredentials/';

    const primaryAPI = this.http.get<any>(`${this.baseURL}${path}${fullname}/${password}`);
    const secondaryAPI = this.http.get<any>(`${this.secondURL}${path}${fullname}/${password}`);
    return race(primaryAPI, secondaryAPI) as Observable<boolean>;
  }

  public addUserActivityToLog(path: string): Observable<any> {
    const url = `${this.baseURL}/addUserActivityToLog/`;
    const data = { route: path, date: this.getCurrentTimeDE() };

    const primaryAPI = this.http.post<any>(url, data);
    return primaryAPI;
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
    const tertiaryAPI = this.http.get<any[]>(`${this.thirdURL}/getUserActivityLog/`);
    return race(primaryAPI, secondaryAPI, tertiaryAPI) as Observable<any[]>
  }

  public removeSpecificProductFromDataBase(
    id: number,
    name: string,
  ): Observable<any> {
    const url = `${this.baseURL}/deleteSpecificProductFromDatabase/`;
    const url2 = `${this.secondURL}/deleteSpecificProductFromDatabase/`;
    const url3 = `${this.thirdURL}/deleteSpecificProductFromDatabase/`;

    const options = {
      params: new HttpParams().set('id', id.toString()).set('name', name)
    };

    const primaryAPI = this.http.delete<any>(url, options);
    const secondaryAPI = this.http.delete<any>(url2, options);
    const tertiaryAPI = this.http.delete<any>(url3, options);
    return race(primaryAPI, secondaryAPI, tertiaryAPI) as Observable<any>;
  }

  public editSpecificProductInDataBase(
    updatedProduct: any,
    originalProduct: any
    ): Observable<any> {
    const url = `${this.baseURL}/editSpecificProductInDatabase/`;

    const requestPayload = {
      original: originalProduct,
      updated: updatedProduct
    };

    return this.http.put<any>(url, requestPayload);
  }

  public addProductToDataBase(product: Product): Observable<any> {
    const url = `${this.baseURL}/addProductToDatabase/`;
    return this.http.post<any>(url, product);
  }

  public requestWebsiteReboot(): Observable<any> {
    const url = 'https://api.render.com/deploy/srv-cpv3d6tumphs73c4u5j0?key=y_z5xJiMmcw';
    return this.http.get<any>(url);
  }
}
