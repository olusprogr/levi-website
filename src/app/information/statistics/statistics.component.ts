import { Component } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  products: number = 0;
  users: number = 0;
  downloads: number = 0;
  subscriptions: number = 0;

  loadingProgress: number = 0;
  loadingReady: boolean = false;

  constructor(
    private productsService: ProductsService,
    private apiService: ApiService
  ) {
    this.requestStatistics();
  }

  private async requestStatistics() {
    while (true) {      
      this.products = this.productsService.getProducts().length;
      if (this.products > 0) {
        this.incrementProgress(25);
      }

      this.apiService.requestUserActivityLog().subscribe(
        (activities: any) => {
          this.users = activities.length;
          if (this.users > 0) {
            this.incrementProgress(25);
          }
        }
      );

      if (this.products > 0 && this.users > 0) {
        this.incrementProgress(100);
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  private incrementProgress(target: number) {
    const step = 1;
    const intervalTime = 10;

    const interval = setInterval(() => {
      if (this.loadingProgress < target) {
        this.loadingProgress += step;
      } else {
        clearInterval(interval);
        if (this.loadingProgress >= 100) {
          this.loadingReady = true;
        }
      }
    }, intervalTime);
  }
}
