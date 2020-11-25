import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ficha } from '../model/ficha.model';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  public readonly API_MOD = "/ficha"
  public readonly API_URL = environment.urlBase + this.API_MOD;

  constructor(
    private http: HttpClient
  ) { }

  create(ficha: Ficha): Observable<Ficha>{
    return this.http.post<Ficha>(this.API_URL + '/save', JSON.stringify(ficha), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  readAll(): Observable<Ficha[]>{
    return this.http.get<Ficha[]>(this.API_URL);
  }

  get(ficha:number): Observable<Ficha>{
    return this.http.get<Ficha>(this.API_URL + '/buscarPorId/' + ficha);
  }

  update(ficha: Ficha): Observable<Ficha>{
    return this.http.put<Ficha>(this.API_URL + '/atualizar', JSON.stringify(ficha), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  delete(ficha:number): Observable<any>{
    return this.http.delete(this.API_URL + '/excluir/' + ficha);
  }
}
