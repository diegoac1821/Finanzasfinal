import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
bonoImg = 'assets/Bono.jpg';
flujoImg = 'assets/FlujoAmericano.jpg';
treaImg = 'assets/TREA.png';
}
