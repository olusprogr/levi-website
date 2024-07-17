import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductsService } from '../../products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import _isEqual from 'lodash/isEqual';
import { ApiService } from '../../api.service';
import { DialogDataAddDialog } from './dialog-data-add';
import { DialogDataEditDialog } from './dialog-data-edit';


type Product = {
  id: number;
  name: string;
  description: string;
  img: string;
  categories: string[];
  link: string;
  price: number;
  discount: number;
}

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinner,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit {
  public isLoaded: boolean = false;
  public products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    setTimeout(() => {
      this.products = this.productService.getProducts();
      if (this.products.length > 0) {this.isLoaded = true}
    }, 500);
    if (!this.isLoaded) {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.products = this.productService.getProducts();
        if (this.products.length > 0) {
          this.isLoaded = true;
          break;
        }
      }
    }
  }

  public deleteProduct(product: Product) {
    const snackBarRef = this.snackBar.open('Deleting product...', 'Undo');
    let isClicked = false;

    snackBarRef.onAction().subscribe(() => {
      isClicked = true;
    });

      setTimeout(() => {
        if (!isClicked) {
          this.apiService.removeSpecificProductFromDataBase(product.id, product.name).subscribe(
            (response) => {
              if (response.success) {
                this.snackBar.open('Successfully removed!', undefined, { duration: 1000 });
                setTimeout(() => {window.location.reload()}, 1000);
              }
            },
            (error) => {
              this.snackBar.open('Error removing product!', undefined, { duration: 2000 });
            }
          )
        }
      }, 5000);
  }
    
  public editProduct(product: Product) {
    this.openDialog(product);
  }

  public openDialog(product: Product): void {
    this.dialog.open(DialogDataEditDialog, {
      data: { product: product}
    });
  }

  public addProduct(): void {
    const product = {
      id: 0,
      name: '',
      description: '',
      img: '',
      categories: [],
      link: '',
      price: 0,
      discount: 0
    };

    this.dialog.open(DialogDataAddDialog, {
      data: { product: product}
    });
  }
}


