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
  public products: any = []
  private categoryProd: any = []
  private staticProducts: any = []
  private currentCategory: string = ''
  public availableCategories: { [key: number]: string } = {
    1: 'NEW❗',
    2: 'Trended🔥',
    3: 'Best Seller',
    4: 'Discount',
    5: 'Best price-performance-offer'
  }
  public activeButton: number | null = null

  constructor(
    private productsService: ProductsService
  ) {
    this.requestDataFromService()
  }

  private async requestDataFromService() {
    while (true) {
      await new Promise(r => setTimeout(r, 500));
      this.products = this.productsService.getProducts();
      this.staticProducts = this.products
      if (this.products != undefined || this.products != null) {break}
    }
  }

  private updateProducts(): [] | void {
    this.categoryProd = []
    this.products = this.staticProducts
    // return this.products
  }
  
  ngOnInit(): void {
    this.updateProducts()
  }

  private checkIfProductHasCategory(category: string, productList: any[]): void {
    this.categoryProd = productList.filter(product => product.categories.includes(category))
  }

  public toggleCetegory(categoryID: number): void {
    if (this.availableCategories[categoryID] === undefined) {return} // if the category does not exist, return
    if (this.currentCategory === this.availableCategories[categoryID]) {return} // if the category is already active, return
    // tirst set reset this.products to the original list of products so avoid duplicates or missing products
    // and set this.categoryProd to an empty array
    this.updateProducts()
    // then search for the category with the index provided by the argument
    this.currentCategory = this.availableCategories[categoryID]
    // filter the products by the category in this.currentCategory
    this.checkIfProductHasCategory(this.currentCategory, this.products)
    // then apply the filtered products to this.products
    this.products = this.categoryProd
  }
}
