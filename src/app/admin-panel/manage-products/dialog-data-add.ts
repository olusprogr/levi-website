import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

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
  export class DialogDataAddDialog {
    public title: string = 'Add Product';
    public selectedCategories: string[] = [];
    public formData: Product = {
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
        public dialogRef: MatDialogRef<DialogDataAddDialog>,
        private snackbar: MatSnackBar,
        private apiService: ApiService
      ) {
      }
  
    public discardChanges(): void {
      this.dialogRef.close();
    }
  
    public saveChanges(): void {
      this.formData.categories = this.selectedCategories;
      if (!this.checkFormData()) {
        this.snackbar.open('Please fill out all fields', 'Close', { duration: 3000 });
        return;
      } else {
        this.snackbar.open('Adding product...', 'Close', { duration: 5000 });
        this.apiService.addProductToDataBase(this.formData).subscribe(() => {
          this.snackbar.open('Product added successfully', 'Close', { duration: 3000 })
        });
        this.dialogRef.close();
      }
    }
  
    public toggleCategory(category: string): void {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
      } else {
        this.selectedCategories.push(category);
      }
    }

    private checkFormData(): boolean {
      const { name, description, categories, link, price } = this.formData;
      if (!name || !description || !categories || !link || !price) {return false}
      return true;
    }
  }