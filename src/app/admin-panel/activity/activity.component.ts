import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type Activity = {
  route: string;
  date: string;
};

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements AfterViewInit {
  public activities: any
  public isLoaded: boolean = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngAfterViewInit(): void {
    this.apiService.requestUserActivityLog().subscribe(
      (activities: Activity[]) => {
        this.activities = activities;
        this.isLoaded = true;
      }
    );
  }
}
