import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/models/commande';
import { environment } from 'src/environments/environment';

// const headers = new Headers();
// headers.append('Access-Control-Allow-Headers', 'Content-Type');
// headers.append('Access-Control-Allow-Methods', 'GET');
// headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = environment.url + 'commande/';

  constructor(private http: HttpClient) { }

  all(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.url);
  }

  find(id: string): Observable<Commande> {
    return this.http.get<Commande>(this.url + id);
  }

  findByProduct(idProduct): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.url + 'findByProduct/' + idProduct);
  }

  create(p: Commande): Observable<string> {
    return this.http.post<string>(this.url, p);
  }

  update(id:string, p: Commande): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
