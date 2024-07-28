import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  category: string;
  description: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {category: 'Login Issue', description: 'Fixed the bug after login that no one the buttons below are executeable.', date: '22. July 2024'},
  {category: 'Information', description: 'Added content to the information page.', date: '28. July 2024'},
];


@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css'
})
export class AdminNewsComponent {
  displayedColumns: string[] = ['category', 'description', 'date'];
  dataSource = ELEMENT_DATA;

  constructor() {
    ELEMENT_DATA.reverse();
  }
}
