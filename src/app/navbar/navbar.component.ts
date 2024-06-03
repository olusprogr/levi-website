import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  navigateTo(path: string): void {
    if (path === 'home') {
      this.router.navigate(['/home'])
      return
    } else if (path === 'products') {
      const targetElement = this.elementRef.nativeElement.querySelector(path)
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }) // need to be fixed
    }
    this.router.navigate(["/home/" , path])
  }
}
