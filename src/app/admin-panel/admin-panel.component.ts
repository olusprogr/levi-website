import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  public triggerDeploy() {
    window.open('https://api.render.com/deploy/srv-cpv3d6tumphs73c4u5j0?key=y_z5xJiMmcw', '_blank');
  }

  public enterAIChat() {
    this.router.navigate([`/home/admin-panel/${this.admin}/ai-chat`]);
  }
}
