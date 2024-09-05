import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendas } from '../_models/Venda';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private apiUrl = 'http://localhost:3000/vendas'

  constructor(private http: HttpClient) { }

  getVendas() : Observable<Vendas[]> {
    return this.http.get<Vendas[]>(this.apiUrl)
  }
}
