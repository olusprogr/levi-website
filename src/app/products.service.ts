import { Injectable, OnInit } from '@angular/core';
import * as products from '../assets/products/products.json';
import { ApiService } from './api.service';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  private products: Product[] = [];

  constructor(
    private apiService: ApiService,
  ) {
    this.requestProductsFromAPI();
  };

  ngOnInit(): void {
    // this.products = (products as any).default as Product[];
  };

  private requestProductsFromAPI(): void {
    this.apiService.requestProductsFromAPI().subscribe((products: Product[]) => {
      this.products = products;
    });
    console.log('Requesting data from service...')
  }

  public getProducts(): Product[] {
    return this.products;
  };

  searchForSpecificProduct(name: string): Product | undefined {
    return this.products.find(product => product.name === name);
  };
}
