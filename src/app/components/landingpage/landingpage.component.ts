import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'] // corregido styleUrls
})
export class LandingpageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirige automáticamente si ya hay token
      this.router.navigate(['/homes']);
    }
  }
  goToLogin(): void {
  this.router.navigate(['/login']);
}
goToRegister(): void {
  this.router.navigate(['/register']);
}

}
