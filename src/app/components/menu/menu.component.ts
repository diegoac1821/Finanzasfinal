import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
})
export class MenuComponent {
  role: string = '';
  userName: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';
      this.userName = userInfo.name || '';
    }
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
  verificar(): boolean {
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';
      this.userName = userInfo.name || '';
      return true;
    }
    return false;
  }
  isCliente() {
    return this.role === 'CLIENTE';
  }
}
