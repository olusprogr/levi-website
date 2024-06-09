import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit{
  inputValue: string = '';
  products: any[] = []

  constructor(
    private searchService: SearchService
  ) {
    
  }
  ngAfterViewInit(): void {
    setInterval(() => {
    }, 2000);
  }

  public onInputChange(event: any): void {
    this.inputValue = event.target.value;
    const asw = this.searchService.searchForProduct(this.inputValue)
    if (asw != null || asw != undefined) {
      this.products = asw
    }
  }
}
