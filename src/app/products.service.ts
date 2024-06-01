import { Injectable, OnInit } from '@angular/core';

import * as products from '../assets/products/products.json'

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  private products: Product[] = []

  constructor(
  ) {
    this.products = (products as any).default as Product[]
    // console.log(this.products)
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getProducts(): Product[] {
    return this.products
  }
}
