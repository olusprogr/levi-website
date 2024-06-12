import { Component, OnInit, ElementRef } from '@angular/core';
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
  availableCategories: { [key: number]: string } = {
    1: 'NEW❗',
    2: 'Trended🔥',
    3: 'Best Seller',
    4: 'Discount',
    5: 'Best price-performance-offer'
  }
  activeButton: number | null = null

  constructor(
    private productsService: ProductsService,
    {nativeElement}: ElementRef<HTMLElement> 
  ) {
    const support = 'loading' in HTMLImageElement.prototype
    if (support) {
      nativeElement.setAttribute('loading', 'lazy')
    }
  }


  updateProducts(): [] {
    this.categoryProd = []
    this.products = this.productsService.getProducts()
    return this.products
  }
  
  ngOnInit(): void {
    this.updateProducts()
  }

  private checkIfProductHasCategory(category: string, productList: any[]): void {
    this.categoryProd = productList.filter(product => product.categories.includes(category))
  }

  toggleCetegory(categoryID: number): void {
    if (this.availableCategories[categoryID] === undefined) {return}
    if (this.currentCategory === this.availableCategories[categoryID]) {return}

    this.activeButton = categoryID

    this.updateProducts()
    this.currentCategory = this.availableCategories[categoryID]
    this.checkIfProductHasCategory(this.availableCategories[categoryID], this.products)
    this.products = this.categoryProd
  }
}
