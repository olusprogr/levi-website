import { AfterViewInit, Component, Input, OnInit, ElementRef } from '@angular/core';
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
export class ProductComponent implements OnInit, AfterViewInit {
  @Input() productName: string = ""
  currentProduct: any

  constructor(
    private productsService: ProductsService,
    private ref: ElementRef
  ) {
  }
  ngAfterViewInit(target: string = "header"): void {
    const targetElement = this.ref.nativeElement.querySelector(`#${target}`);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnInit(): void {
    this.currentProduct = this.productsService.searchForSpecificProduct(this.productName)
  }

  public navigateToWebsite() {
    window.open(this.currentProduct["link"], '_blank');
  }
}
