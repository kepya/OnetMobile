import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url + 'user/';

  constructor(private http: HttpClient) { }

  all(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  find(id: string): Observable<User> {
    return this.http.get<User>(this.url + 'findById/' + id);
  }

  findByEmail(email): Observable<User> {
    return this.http.get<User>(this.url + 'findByEmail/' + email);
  }

  allSimpleUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'allSimpleUser');
  }

  update(id:string, p: User): Observable<string> {
    return this.http.put<string>(this.url + id, p);
  }

}
