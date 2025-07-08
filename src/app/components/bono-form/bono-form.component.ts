// bono-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

import { BonoService } from '../../services/bono.service';
import { LoginService } from '../../services/login.service';
import { Resultado } from '../../models/Resultado';
import { Flujo } from '../../models/Flujo';

@Component({
  selector: 'app-bono-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './bono-form.component.html',
  styleUrl: './bono-form.component.css',
})
export class BonoFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  resultado?: Resultado;
  flujos: Flujo[] = [];

  monedas = ['PEN', 'USD'];
  frecuencias = ['Semestral', 'Anual'];
  gracias = ['Ninguna', 'Total'];
  displayedColumns: string[] = [
    'periodo',
    'fecha_pago',
    'interes',
    'amortizacion',
    'cuotatotal',
    'saldo',
    'graciaPeriodo',
  ];

  constructor(
    private fb: FormBuilder,
    private bonoService: BonoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      montonominal: [null, [Validators.required, this.validarMontoNominal]],
      moneda: ['', Validators.required],
      tasainteres: [
        null,
        [Validators.required, Validators.min(2), Validators.max(12)],
      ],
      tasaCOK: [
        null,
        [Validators.required, Validators.min(3), Validators.max(20)],
      ],
      frecuenciapago: ['', Validators.required],
      plazoanios: [null, [Validators.required, Validators.min(3)]],
      fechaemision: [null, Validators.required],
      idUsuario: [this.loginService.getUsuarioId()],
      mapaGraciaPorPeriodo: this.fb.array([]),
    });
  }

  get graciaFormArray(): FormArray<FormGroup> {
    return this.form.get('mapaGraciaPorPeriodo') as FormArray<FormGroup>;
  }

  validarMontoNominal(control: FormControl) {
    const valoresPermitidos = [1000, 2000, 3000, 4000, 5000];
    return valoresPermitidos.includes(control.value)
      ? null
      : { montoInvalido: true };
  }

  validaPlazo(): boolean {
    const plazo = this.form.get('plazoanios')?.value;
    return plazo >= 3;
  }

  generarPeriodos(): void {
    const formArray = this.form.get('mapaGraciaPorPeriodo') as FormArray;
    formArray.clear();
    const frecuencia = this.form.get('frecuenciapago')?.value;
    const anios = this.form.get('plazoanios')?.value;

    const pagosPorAño = frecuencia === 'Semestral' ? 2 : 1;
    const totalPeriodos = anios * pagosPorAño;

    for (let i = 1; i <= totalPeriodos; i++) {
      formArray.push(
        this.fb.group({
          periodo: [i],
          tipo: ['Ninguna', Validators.required],
        })
      );
    }
  }

  calcular(): void {
    if (this.form.valid) {
      const id = this.loginService.getUsuarioId();
      if (!id || id === 0) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        return;
      }

      const anios = this.form.get('plazoanios')?.value;
      const meses = anios * 12;

      const graciaMap: { [key: number]: string } = {};
      for (const group of this.graciaFormArray.controls) {
        const g = group.value as { periodo: number; tipo: string };
        graciaMap[g.periodo] = g.tipo;
      }

      const data = {
        ...this.form.value,
        idUsuario: id,
        plazomeses: meses,
        mapaGraciaPorPeriodo: graciaMap,
      };
      delete data.plazoanios;

      this.bonoService.previsualizar(data).subscribe(
        (resp) => {
          this.flujos = resp.flujos || [];
          this.resultado = resp.resultado || undefined;
        },
        (err) => {
          alert('Ocurrió un error al calcular el bono.');
        }
      );
    }
  }
  role: string = '';
  guardar(): void {
    if (this.form.valid && this.resultado) {
      const id = this.loginService.getUsuarioId();
      if (!id || id === 0) {
        alert('Sesión inválida. Inicia sesión nuevamente.');
        return;
      }

      const anios = this.form.get('plazoanios')?.value;
      const meses = anios * 12;

      const graciaMap: { [key: number]: string } = {};
      for (const group of this.graciaFormArray.controls) {
        const g = group.value as { periodo: number; tipo: string };
        graciaMap[g.periodo] = g.tipo;
      }

      const data = {
        ...this.form.value,
        idUsuario: id,
        plazomeses: meses,
        mapaGraciaPorPeriodo: graciaMap,
      };
      delete data.plazoanios;

      this.bonoService.registrar(data).subscribe(
        () => {
          alert('Bono guardado exitosamente');
          this.form.reset();
          this.flujos = [];
          this.resultado = undefined;
          (this.form.get('mapaGraciaPorPeriodo') as FormArray).clear();
        },
        (err) => {
          alert('No se pudo guardar el bono.');
        }
      );
    } else {
      alert(
        'Primero debes calcular y revisar los resultados antes de guardar.'
      );
    }
  }
  bloquearSimbolos(event: KeyboardEvent): void {
    const tecla = event.key;
    const simbolosBloqueados = ['-', '+', '*', '/', 'e', 'E'];
    if (simbolosBloqueados.includes(tecla)) {
      event.preventDefault();
    }
  }

  bloquearPegado(event: ClipboardEvent): void {
    const textoPegado = event.clipboardData?.getData('text') || '';
    const contieneSimbolos = /[-+*/eE]/.test(textoPegado);
    if (contieneSimbolos) {
      event.preventDefault();
    }
  }
  esCliente(): boolean {
    return this.loginService.getUserRole() === 'CLIENTE';
  }
}
