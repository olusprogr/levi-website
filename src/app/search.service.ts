import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  products: any[] = []
  productNames: string[] = []

  constructor(
    private productService: ProductsService
  ) {
    this.products = this.productService.getProducts()
    this.products.forEach(product => {
      this.productNames.push(product.name)
    });
  }

  public searchForProduct(
    target: string,
    arr: string[] = this.productNames
  ): any[] | null {
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
