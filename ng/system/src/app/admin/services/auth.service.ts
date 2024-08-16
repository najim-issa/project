import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.64.91:8000/api/signup';

  constructor(private http: HttpClient) { }

  signup(user: any) {
    return this.http.post(this.apiUrl, user);
  }

}
