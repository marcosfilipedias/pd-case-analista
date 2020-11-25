import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public readonly API_MOD = "/client"
  public readonly API_URL = environment.urlBase + this.API_MOD;

  constructor(
    private http: HttpClient
  ) { }

  createClient(client: Client): Observable<Client>{
    return this.http.post<Client>(this.API_URL + '/save', JSON.stringify(client), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  readAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.API_URL,{
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  getClient(clientId:number): Observable<Client>{
    return this.http.get<Client>(this.API_URL + '/buscarPorId/' + clientId);
  }

  updateClient(client: Client): Observable<Client>{
    return this.http.put<Client>(this.API_URL + '/atualizar', JSON.stringify(client), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  deleteClient(client:number): Observable<any>{
    return this.http.delete(this.API_URL + '/excluir/' + client);
  }
}
