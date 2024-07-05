import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {
  public inputValue: string = '';
  public products: any[] = []

  constructor(
    private searchService: SearchService,
    private apiService: ApiService
  ) {
  }
  
  ngAfterViewInit(): void {
    this.apiService.addUserActivityToLog('/home/search').subscribe();
  }

  public async onInputChange(event: any) {
    this.inputValue = event.target.value;
    while (true) {
      await new Promise(r => setTimeout(r, 500));
      const asw = this.searchService.searchForProduct(this.inputValue);
      if (asw != null || asw != undefined) {
        this.products = asw;
      }
    }
  }
}
