import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from 'src/app/models/paiment';
import { environment } from 'src/environments/environment';

// const headers = new Headers();
// headers.append('Access-Control-Allow-Headers', 'Content-Type');
// headers.append('Access-Control-Allow-Methods', 'GET');
// headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class Paiementervice {

  url = environment.url + 'paiement/';

  constructor(private http: HttpClient) { }

  all(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.url);
  }

  find(id: string): Observable<Paiement> {
    return this.http.get<Paiement>(this.url + id);
  }

  findByCommande(idCommande): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.url + 'findByCommande/' + idCommande);
  }

  create(p: Paiement): Observable<string> {
    return this.http.post<string>(this.url, p);
  }

  update(id:string, p: Paiement): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
