import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  @Input() public admin: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {}

  public refreshCurrentWebsite() {
    window.location.reload();
  }

  public triggerDeploy() {
    this.apiService.requestWebsiteReboot().subscribe()
    this.snackBar.open('Website is being rebooted...', 'Close', {duration: 3000});
  }

  public enterAIChat() {
    this.router.navigate([`/home/admin-panel/${this.admin}/ai-chat`]);
  }
}
