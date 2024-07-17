import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public products: any[] = [];
  public productNames: string[] = []

  constructor(
    private productService: ProductsService
  ) {
    this.requestProducts();
    this.filterProductsByNamesWhenAvailable();
  }

  private async filterProductsByNamesWhenAvailable() {
    while (true) {
      await new Promise(r => setTimeout(r, 100));
      if (this.products.length !== 0) {
        this.products.forEach(product => {
          this.productNames.push(product.name);
        });
        break
      }
    }
  }

  // trying to request every 500miliseconds products from the service. if found, break the loop
  private async requestProducts() {
    while (true) {
      await new Promise(r => setTimeout(r, 500));
      this.products = this.productService.getProducts();
      if (this.products.length !== 0) {break}
    }
  }

  public searchForProduct(
    target: string,
    arr: string[] = this.productNames
  ): any[] | null {
    if (this.products.length === 0) {return null}
    const elementsFound = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(target)) {
            elementsFound.push(i);
        }
    }
    if (elementsFound.length === 0 || elementsFound === null || undefined) {
        return null
    }
    return this.findProductWithFollowingNames(elementsFound)
  }

  public findProductWithFollowingNames(arr: number[]): any[] {
    return arr.map(index => this.products[index])
  }
}
