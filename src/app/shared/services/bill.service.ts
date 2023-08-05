import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateReport(data:any): Observable<any>{
    return this.http.post(`${this.url}/bill/generate_report`, data);
  }

  getPdf(data:any): Observable<any>{
    return this.http.post(`${this.url}/bill/get_pdf`, data, {responseType:'blob'});
  }

  get(email?: string): Observable<any>{
    let url:any = email? `${this.url}/bill/get/${email}` : `${this.url}/bill/get`;
    return this.http.get(url);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/bill/delete/${id}`);
  }
}
