import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panier } from 'src/app/models/panier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  url = environment.url + 'panier/';

  constructor(private http: HttpClient) { }

  all(): Observable<Panier[]> {
    return this.http.get<Panier[]>(this.url);
  }

  find(id: string): Observable<Panier> {
    return this.http.get<Panier>(this.url + id);
  }

  findByUser(idUser): Observable<Panier> {
    return this.http.get<Panier>(this.url + 'findByUser/' + idUser);
  }

  create(p: Panier): Observable<string> {
    return this.http.post<string>(this.url, p);
  }

  update(id:string, p: Panier): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
