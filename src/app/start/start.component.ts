import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NgbCarousel,
    CommonModule,
    RouterLink
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  products: any = []

  constructor(
    private productsService: ProductsService
  ) {
    
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts()
  }
}
