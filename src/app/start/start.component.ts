import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NgbCarousel,
    CommonModule,
    RouterLink,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  products: any = []
  categoryProd: any = []
  currentCategory: string = ''

  constructor(
    private productsService: ProductsService
  ) {

  }

  updateProducts(): void {
    this.products = this.productsService.getProducts()
  }
  
  ngOnInit(): void {
    this.updateProducts()
  }

  private checkIfProductHasCategory(category: string, productList: any[]): boolean {
    this.categoryProd = []
    for (let product of productList) {
      for (let prodCategory of product.categories) {
        if (prodCategory === category) {
          this.categoryProd.push(product)
          return true
        }
      }
    }
    return false
  }

  toggleCetegory(categoryID: number): void {
    const availableCategories: { [key: number]: string } = {
      1: 'NEW❗',
      2: 'Trended🔥',
      3: 'Best Seller',
      4: 'Discount',
      5: 'Best price-performance-offer'
    }
    
    if (availableCategories[categoryID] === undefined) {
      return
    } else {
      this.currentCategory = availableCategories[categoryID]
    }

    if (this.checkIfProductHasCategory(this.currentCategory, this.products)) {
      this.updateProducts()
      this.products = this.categoryProd
      console.log(this.products)
    }
  }
}
