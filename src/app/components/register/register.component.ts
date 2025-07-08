import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // por si usas <input>
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule y FormsModule
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
    });
  }

   onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // 👇 Convertir "EMISOR" a "ADMIN" antes de enviarlo
      if (formData.rol === 'EMISOR') {
        formData.rol = 'ADMIN';
      }

      this.loginService.register(formData).subscribe({
        next: () => {
          alert('✅ Registro exitoso. Ahora inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('❌ Error al registrar: ' + (err.error.message || err.message));
        }
      });
    }
  }
}
