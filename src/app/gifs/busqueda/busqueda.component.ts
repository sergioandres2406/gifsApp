import { Component, ElementRef, ViewChild } from '@angular/core';
import {GifsService} from "../services/gifs.service";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent   {
  /*  Aqui cuando uso !:  quiere decir que le estoy diciendo a angular que este valor nunca va a tener
  * un valor nulo  */
  @ViewChild('inputBuscar') inputBuscar!:ElementRef<HTMLInputElement>;

  /*  Aqui vamos a inicializar el servicio  */
  constructor( private gifsService:  GifsService ) {
  }

  buscar()  {
   const valor = this.inputBuscar.nativeElement.value;
   /*  Si no hay nada en valor entonces salgase de buscar() y no haga nada, el trim es para quitar los espacios */
   if (valor.trim().length === 0){
      return;
   }
   this.gifsService.buscarGifs(valor);
   /*  Luego de imprimir en consola el valor,  limpio el imput*/
  this.inputBuscar.nativeElement.value='';
  }



}
