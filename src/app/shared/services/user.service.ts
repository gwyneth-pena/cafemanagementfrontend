import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signup(data:any): Observable<any>{
    return this.http.post<any>(this.url+'/user/sign_up', data);
  }

  forgotPassword(data:any): Observable<any>{
    return this.http.post<any>(this.url+'/user/forgot_password', data);
  }

  changePassword(data:any): Observable<any>{
    return this.http.post<any>(this.url+'/user/change_password', data);
  }

  logout(data:any): Observable<any>{
    return this.http.post<any>(this.url+'/user/logout', data);
  }

  login(data:any): Observable<any>{
    return this.http.post<any>(this.url+'/user/login', data);
  }

  update(data:any): Observable<any>{
    return this.http.patch<any>(this.url+`/user/update/${data.id}`, data);
  }

  get(): Observable<any>{
    return this.http.get<any>(this.url+"/user/get");
  }
  
}
