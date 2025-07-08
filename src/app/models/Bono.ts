export class Bono {
  idBono: number = 0;
  nombre: string = "";
  montonominal: number = 0;
  moneda: string = "";
  tasainteres: number = 0;
  frecuenciapago: string = "";
  plazomeses: number = 0;
  fechaemision: Date = new Date(Date.now());
  tasaCOK: number = 0;
  idUsuario: number = 0;

  
  mapaGraciaPorPeriodo: { [periodo: number]: string } = {};
}
