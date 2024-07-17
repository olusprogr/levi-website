import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

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
export class ProductsService {
  private products: Product[] = [];

  constructor(
    private apiService: ApiService,
  ) {
    this.requestProductsContinuously();
  }

  private async requestProductsContinuously(): Promise<void> {
    while (true) {
      await new Promise(r => setTimeout(r, 1000));
      this.requestProductsFromAPI();
      if (this.products.length > 0) {break}
    }
  }

  private requestProductsFromAPI(): void {
    this.apiService.requestProductsFromAPI().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public getProducts(): Product[] {
    return this.products;
  };

  searchForSpecificProduct(name: string): Product | undefined {
    return this.products.find(product => product.name === name);
  };
}
