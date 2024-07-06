import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit{
  public fullname: string = '';
  public password: string = '';
  private isLoginDataCorrect: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private scrollContainer: ElementRef
  ) {
    this.checkIfDataIsCorrect();
  }
  ngAfterViewInit(): void {
    this.apiService.addUserActivityToLog('/home/search').subscribe();
    window.scrollTo(0, 0);
  }

  private scrollToTop(): void {
    this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public login() {
    this.apiService.checkLoginCredentials('/checkLoginCredentials/', this.fullname, this.password).subscribe((response) => {
      this.isLoginDataCorrect = response
    });
  }

  private async checkIfDataIsCorrect() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (this.isLoginDataCorrect) {
      
        this.router.navigate(['/home/admin-panel/', this.fullname]);
      }
    }
  }
}
