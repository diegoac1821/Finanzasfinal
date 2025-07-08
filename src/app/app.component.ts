import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontedFinanzas';
  

  
}
