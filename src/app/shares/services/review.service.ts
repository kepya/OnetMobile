import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = environment.url + 'review/';

  constructor(private http: HttpClient) { }

  all(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url);
  }

  find(id: string): Observable<Review> {
    return this.http.get<Review>(this.url + id);
  }

  findByUser(idUser): Observable<Review> {
    return this.http.get<Review>(this.url + 'findByUser/' + idUser);
  }

  findByProduct(idProduct): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + 'findByProduct/' + idProduct);
  }

  create(p: Review): Observable<string> {
    return this.http.post<string>(this.url, p);
  }

  update(id:string, p: Review): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
