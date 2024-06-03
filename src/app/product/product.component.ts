import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
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
}
