import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
import { concatAll, first } from 'rxjs';
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
export class ManageProductsComponent {
  public isLoaded: boolean = false;
  public products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    setTimeout(() => {
      this.products = this.productService.getProducts();
      if (this.products.length > 0) {this.isLoaded = true}
    }, 1000);
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
        const snackBarRef = this.snackBar.open('Successfully deleted!');
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 1500)
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
  formData = {
    name: '',
    description: '',
    imageLink: '',
    category: [] as string[],
    productLink: '',
    amount: 0,
    discount: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {product: Product},
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    private snackbar: MatSnackBar
    ) {
      if (data.product) {
        this.formData.name = data.product.name;
        this.formData.description = data.product.description;
        this.formData.imageLink = data.product.img;
        for (let category of data.product.categories) {
          this.formData.category.push(category);
          this.selectedCategories.push(category);
        }
        this.formData.productLink = data.product.link;
        this.formData.amount = data.product.price;
        this.formData.discount = data.product.discount;
      }
    }

  public discardChanges() {
    this.dialogRef.close();
  }

  public saveChanges() {
    this.checkTheFormData();
  }

  public checkTheFormData(): boolean | void {
    if (
      this.formData.name === '' || this.formData.description === '' || 
      this.formData.category.length === 0 || this.formData.productLink === '' || 
      this.formData.amount === 0
      ) {
        return false;
    } else {
      this.dialogRef.close();
      let asw = this.snackBarChange('Saving changes...', 'Successfully saved!');
      console.log(asw);
    }
  }

  private snackBarChange(
    firstMessage: string,
    secondMessage: string,
  ): boolean | void {
    let isClicked = false;

    const snackbar = this.snackbar.open(firstMessage, 'Undo');
    snackbar.onAction().subscribe(() => {isClicked = true});
    setTimeout(() => {
      snackbar.dismiss();
      if (!isClicked) {
        const snackBarRef = this.snackbar.open(secondMessage);
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 1500)
        return true;
      } else {
        return false;
      }
    }, 5000);
  }

  selectedCategories: string[] = [];

  public toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }
}
