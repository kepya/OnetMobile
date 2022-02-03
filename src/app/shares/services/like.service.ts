import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favoris } from 'src/app/models/favoris';
import { Like } from 'src/app/models/like';
import { Products } from 'src/app/models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  url = environment.url + 'favoris/';

  constructor(private http: HttpClient) { }

  all(): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(this.url);
  }

  find(id: string): Observable<Favoris> {
    return this.http.get<Favoris>(this.url + id);
  }

  allByUser(idUser): Observable<Favoris> {
    return this.http.get<Favoris>(this.url + 'allByUser/' + idUser);
  }

  allByProduct(idProduct): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(this.url + 'allByProduct/' + idProduct);
  }

  nombreByProduct(idProduct): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(this.url + 'nombreByProduct/' + idProduct);
  }

  allProductByUser(idUser): Observable<Products[]> {
    return this.http.get<Products[]>(this.url + 'allProductByUser/' + idUser);
  }

  add(l: any): Observable<any> {
    return this.http.post<any>(this.url, l);
  }

  update(id:string, p: Like): Observable<any> {
    return this.http.put<any>(this.url + id, p);
  }

}
