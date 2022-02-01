import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products';
import { environment } from 'src/environments/environment';

// const headers = new Headers();
// headers.append('Access-Control-Allow-Headers', 'Content-Type');
// headers.append('Access-Control-Allow-Methods', 'GET');
// headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.url + 'product/';

  constructor(private http: HttpClient) { }

  all(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url);
  }

  find(id: string): Observable<Products> {
    return this.http.get<Products>(this.url + id);
  }

  findByMarque(marque): Observable<Products[]> {
    return this.http.get<Products[]>(this.url + 'findByMarque/' + marque);
  }

  create(p: Products): Observable<string> {
    return this.http.post<string>(this.url, p);
  }

  update(id:string, p: Products): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
