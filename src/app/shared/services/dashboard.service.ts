import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDashboardDetails(): Observable<any>{
    return this.http.get<any>(this.url+'/dashboard/details');
  }
}
