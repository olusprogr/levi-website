import { AfterViewInit, Component } from '@angular/core';
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
  ) {}
  
  ngAfterViewInit(): void {
    this.apiService.addUserActivityToLog('/home/login').subscribe();
    window.scrollTo(0, 0);
  }

  public login() {
    this.apiService.checkLoginCredentials(this.fullname, this.password).subscribe((response) => {
      this.isLoginDataCorrect = response
      if (this.isLoginDataCorrect && this.fullname !== '' && this.password !== '') {
        this.router.navigate(['/home/admin-panel/', this.fullname]);
      }
    })
  }
}
