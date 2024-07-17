import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


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
    MatButtonModule,
    MatProgressSpinner
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
  public isLoaded: boolean = false

  constructor(
    private productsService: ProductsService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    // Fetching the products from the service
    this.requestDataFromService();
    this.updateProducts();
    
    // Registering the user activity to the Database
    this.api.addUserActivityToLog('/home').subscribe();
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
  
  private async requestDataFromService() {
    // Creating a thread to wait for the products to be fetched. Requesting the products every 100ms.
    // If the products are fetched, shuffle the products and notify the component that the products are loaded.
    while (true) {
      await new Promise(r => setTimeout(r, 500));
      this.products = this.productsService.getProducts();
      this.staticProducts = this.products;
      if (this.products.length > 0) {
        this.products = this.shuffleArray(this.products);
        this.isLoaded = true;
        break;
      }
    }
  }

  private updateProducts(): [] | void {
    this.categoryProd = [];
    this.products = this.staticProducts;
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
    // finally set the activeButton to the categoryID
    this.activeButton = categoryID
  }
}
