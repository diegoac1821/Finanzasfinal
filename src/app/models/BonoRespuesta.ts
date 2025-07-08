import { Bono } from './Bono';
import { Flujo } from './Flujo';
import { Resultado } from './Resultado';

export class BonoRespuesta {
  bono: Bono=new Bono();
  flujos: Flujo[]=[];
  resultado: Resultado=new Resultado();
}
