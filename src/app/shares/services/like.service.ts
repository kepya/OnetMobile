import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like';
import { Products } from 'src/app/models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  url = environment.url + 'like/';

  constructor(private http: HttpClient) { }

  all(): Observable<Like[]> {
    return this.http.get<Like[]>(this.url);
  }

  find(id: string): Observable<Like> {
    return this.http.get<Like>(this.url + id);
  }

  allByUser(idUser): Observable<Like[]> {
    return this.http.get<Like[]>(this.url + 'allByUser/' + idUser);
  }

  allByProduct(idProduct): Observable<Like[]> {
    return this.http.get<Like[]>(this.url + 'allByProduct/' + idProduct);
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
