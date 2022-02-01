import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like';
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

  findByUser(idUser): Observable<Like> {
    return this.http.get<Like>(this.url + 'findByUser/' + idUser);
  }

  findByProduct(idProduct): Observable<Like[]> {
    return this.http.get<Like[]>(this.url + 'findByProduct/' + idProduct);
  }

  add(l: any): Observable<any> {
    return this.http.post<any>(this.url, l);
  }

  update(id:string, p: Like): Observable<any> {
    return this.http.put<any>(this.url + id, p);
  }

}
