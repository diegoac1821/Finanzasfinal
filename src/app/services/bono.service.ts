import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Bono } from '../models/Bono';
import { Observable } from 'rxjs';
import { BonoRespuesta } from '../models/BonoRespuesta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class BonoService {
  private url = `${base_url}/Bonos`;

  constructor(private http: HttpClient) {}

  previsualizar(bono: Bono): Observable<BonoRespuesta> {
    return this.http.post<BonoRespuesta>(`${this.url}/previsualizar`, bono);
  }

  registrar(bono: Bono): Observable<BonoRespuesta> {
    return this.http.post<BonoRespuesta>(`${this.url}/registrar`, bono);
  }
}
