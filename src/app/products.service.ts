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
    this.shuffleArray(this.products.slice(0, 10))
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
        this.products = array
    }
}

  ngOnInit(): void {

  }

  public getProducts(): Product[] {
    return this.products
  }

  public searchForSpecificProduct(name: string): Product | undefined {
    return this.products.find(product => product.name === name)
  }
}
