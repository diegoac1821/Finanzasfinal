import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        if (data.token && data.token.split('.').length === 3) {
          sessionStorage.setItem('token', data.token);
          console.log('✅ Token guardado:', data.token);
          this.router.navigate(['/homes']);
        } else {
          this.snackBar.open('❌ Token inválido recibido del servidor.', 'Cerrar', { duration: 3000 });
        }
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}
