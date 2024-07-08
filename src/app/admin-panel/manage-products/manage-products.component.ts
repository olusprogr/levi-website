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
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';


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

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinner,
    MatButtonModule
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  public isLoaded: boolean = false;
  public products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {
    setTimeout(() => {
      this.products = this.productService.getProducts();
      if (this.products.length > 0) {this.isLoaded = true}
    }, 1000);
  }

  public deleteProduct(_t17: Product) {
    throw new Error('Method not implemented.');
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
    category: '',
    productLink: '',
    amount: 0,
    discount: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {product: Product},
    public dialogRef: MatDialogRef<DialogDataExampleDialog>
    ) {
      if (data.product) {
        this.formData.name = data.product.name;
        this.formData.description = data.product.description;
        this.formData.imageLink = data.product.img;
        this.formData.category = data.product.categories[0];
        this.formData.productLink = data.product.link;
        this.formData.amount = data.product.price;
        this.formData.discount = data.product.discount;
      }
    }

  public discardChanges() {
    this.dialogRef.close();
  }

  public saveChanges() {
    console.log(this.checkTheFormData());
  }

  public checkTheFormData(): boolean {
    if (
      this.formData.name === '' || this.formData.description === '' || 
      this.formData.category === '' || this.formData.productLink === '' || 
      this.formData.amount === 0
      ) {
      return false;
    } else {
      return true;
    }
  }
}
