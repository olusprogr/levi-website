import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input() productName: string = ""
  currentProduct: any

  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.currentProduct = this.productsService.searchForSpecificProduct(this.productName)
  }

  public navigateToWebsite() {
    window.open(this.currentProduct["link"], '_blank');
  }
}
