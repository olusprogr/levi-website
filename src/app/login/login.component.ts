import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

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
export class LoginComponent {
  public fullname: string = '';
  public password: string = '';
  private isLoginDataCorrect: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkIfDataIsCorrect();
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
