import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procedimento } from '../model/procedimento.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  public readonly API_MOD = "/procedimento"
  public readonly API_URL = environment.urlBase + this.API_MOD;

  constructor(
    private http: HttpClient
  ) { }

  create(procedimento: Procedimento): Observable<Procedimento>{
    return this.http.post<Procedimento>(this.API_URL + '/save', JSON.stringify(procedimento), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  readAll(): Observable<Procedimento[]>{
    return this.http.get<Procedimento[]>(this.API_URL);
  }

  get(procedimento:number): Observable<Procedimento>{
    return this.http.get<Procedimento>(this.API_URL + '/buscarPorId/' + procedimento);
  }

  update(procedimento: Procedimento): Observable<Procedimento>{
    return this.http.put<Procedimento>(this.API_URL + '/atualizar', JSON.stringify(procedimento), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  delete(procedimento:number): Observable<any>{
    return this.http.delete(this.API_URL + '/excluir/' + procedimento);
  }

  marcarPocedimento(procedimento, cliente): Observable<Procedimento>{
    return this.http.get<Procedimento>(this.API_URL + '/marcarProcedimento/cliente/' + cliente + '/procedimento/' + procedimento);
  }

  buscarProcedimentoRealizados(idCliente): Observable<any>{
    return this.http.get<Procedimento>(this.API_URL + '/procedimentosRealizados/cliente/' + idCliente);
  }
}
