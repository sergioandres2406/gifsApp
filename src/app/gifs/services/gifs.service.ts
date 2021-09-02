import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interface/gifs.interface";


@Injectable({
  providedIn: 'root'
})
export class GifsService {

      /*   CLAVE DEL API DE GIPHY  2ZPKKUbzb5wKjvBdyokhVrvuTYbTgRMM  */
  private  apiKey: string = '2ZPKKUbzb5wKjvBdyokhVrvuTYbTgRMM';

  private  servicioUrl: string = 'https://api.giphy.com/v1/gifs';

      /*  declaro la propiedad privada historial  como un arreglo de strings y la inicializo en cero
      * El guion bajo a la izq de historial es para actualizar valores en tiempo real */
  private _historial: string[] = [];


  public resultados: Gif[] = [];



     /* aqui declaro el get para acceder al arreglo _historial  */
  get historial(){

    /*  aqui devuelvo el valor del arreglo _historial ,  los [... es para DESLIGAR el this._historial   del  arreglo _historial. ]*/
    return [...this._historial];
  }

    /*  declaro un objeto http de tipo Httpclient, para hacer peticiones http al api de giphy
    *   dentro del constructor   cargo la info del localStorage  */
  constructor(private  http: HttpClient) {

    /* si hay información en el localStorage entonces actualiza _historial con ella
    * En la siguiente linea  estamos llevando a _historial el localStorage convertido a un objeto JSON,
    * y se pone el signo de admiración para decirle a angular que confie en el código, que nunca va a llegar null */

    /* if(localStorage.getItem('historial')) {
        this._historial = JSON.parse(localStorage.getItem('historial')!);
    }  */

    /*  estamos llevando a _historial el localStorage convertido a un objeto JSON, y si está vacío decimos que devuelva un objeto vacio
    * y ponemos la ! para que angular confie en la ejecución  */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('Ultima_Busqueda')!) || [];

  }

      /* Buscargifs recibe un parámetro query de tipo string y con unshift pongo el valor al principio del arreglo  */
  buscarGifs(query:string){
        /* convertiré el valor que ingresó en query  a minúsculas  */
    query = query.trim().toLocaleLowerCase();
        /*  si el valor que acabaron de ingresar no está incluido en el arreglo, o sea, si no está repetido.
        * El ! al principio niega la expresion
        * entonces anexo caracter y luego recorto los primeros 10 valores */
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
          /*  estoy cortando _historial para solo obtener sus 10 primeros elementos  */
      this._historial = this._historial.splice(0,10);

      /*  estoy guardando en local storage el objeto _historial convertido a string  con la instruccion JSON.stringify  */
      localStorage.setItem('historial', JSON.stringify( this._historial ) );
    }


    /*  defino una constante lamada params que es un objeto httpParams */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',query);
      console.log(params.toString());

      /*  estoy llamando el método get del parámetro http que creé del módulo HttpClient  para captura
      *   .suscribe funciona como un then:  una vez se concrete la url entonces realizará la acción dentro del .suscribe
      *   en este caso,  cuando se resuelva la url va a devolver un objeto tipo json, y va a quedar en el objeto resp que acabamos de crear
      * el get va a traer una respuesta o resultado de la url,  y le especificamos que esa respuesta que va a traer va a ser del tipo de la interfaz SearchGifsResponse  */


   this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
     .subscribe((resp ) => {
      console.log(resp.data);
      this.resultados =resp.data;
       /*  estoy guardando en local storage el objeto resultados convertido a string  con la instruccion JSON.stringify  */
       localStorage.setItem('Ultima_Busqueda', JSON.stringify( this.resultados ) );

     });
  }
}



