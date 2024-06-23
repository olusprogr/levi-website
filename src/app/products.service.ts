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
    
  }

  ngOnInit(): void {

  }

  getProducts(): Product[] {
    return this.products
  }

  searchForSpecificProduct(name: string): Product | undefined {
    return this.products.find(product => product.name === name)
  }
}
