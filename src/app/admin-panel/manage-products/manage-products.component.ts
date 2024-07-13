import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductsService } from '../../products.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import _isEqual from 'lodash/isEqual';
import { ApiService } from '../../api.service';


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

  private httpRequestForDeletion(product: Product): void {
    this.apiService.removeSpecificProductFromDataBase(product.id, product.name).subscribe()
  }

  public deleteProduct(product: Product) {
    const snackBarRef = this.snackBar.open('Deleting product...', 'Undo');
    let isClicked = false;

    snackBarRef.onAction().subscribe(() => {
      isClicked = true;
    });

    setTimeout(() => {
      snackBarRef.dismiss();
      if (!isClicked) {
        this.httpRequestForDeletion(product);
        const snackBarRef = this.snackBar.open('Successfully deleted!', undefined, { duration: 1000 });
        window.location.reload();
      }
    }, 5000);
  }
    
  public editProduct(product: Product) {
    this.openDialog(product);
  }

  public openDialog(product: Product): void {
    this.dialog.open(DialogDataExampleDialog, {
      data: { product: product}
    });
  }
}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example.html',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
})
export class DialogDataExampleDialog {
  public selectedCategories: string[] = [];
  public formData = {
    id: 0,
    name: '',
    description: '',
    img: '',
    categories: [] as string[],
    link: '',
    price: 0,
    discount: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    private snackbar: MatSnackBar,
    private apiService: ApiService
  ) {
    if (data.product) {
      this.formData.id = data.product.id;
      this.formData.name = data.product.name;
      this.formData.description = data.product.description;
      this.formData.img = data.product.img;
      for (let category of data.product.categories) {
        this.formData.categories.push(category);
        this.selectedCategories.push(category);
      }
      this.formData.link = data.product.link;
      this.formData.price = data.product.price;
      this.formData.discount = data.product.discount;
    }
  }

  public discardChanges(): void {
    this.dialogRef.close();
  }

  public saveChanges(): void {
    if (!this.checkFormData()) {return}
    if (_isEqual(this.formData, this.data.product)) {
      this.snackbar.open('No changes were made!', undefined, { duration: 1500 });
      return;
    }

    this.dialogRef.close();
    const snackBarRef = this.snackbar.open('Editing product...', 'Undo');
    let isClicked = false;

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
      isClicked = true;
    });

    setTimeout(() => {
      if (!isClicked) {
        this.apiService.editSpecificProductInDataBase(this.formData, this.data.product).subscribe(
          (response) => {
            console.log(response);
            if (response.success) {
              this.snackbar.open('Successfully edited!', undefined, { duration: 1000 });
              window.location.reload();
            }
          },
          (error) => {
            this.snackbar.open('Error editing product!', undefined, { duration: 1000 });
          }
        )
      }
    }, 5000);
  }

  private checkFormData(): boolean {
    const { name, description, categories, link, price } = this.formData;
    if (!name || !description || !categories || !link || !price) {return false}
    return true;
  }

  public toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }
}
