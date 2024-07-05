import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [],
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
