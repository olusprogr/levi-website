import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../api.service';
import { StatisticsComponent } from './statistics/statistics.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    StatisticsComponent
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent implements AfterViewInit {
  constructor(
    private apiService: ApiService
  ) {}

  ngAfterViewInit(): void {
    this.apiService.addUserActivityToLog('/home/information').subscribe();
  }
}
