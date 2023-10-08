import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../models/token';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  isAuthenticated(token?: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<boolean>(
      `${environment.API_URL}/authentication/isAuthenticated`,
      { headers }
    );
  }

  login(username: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>(
      `${environment.API_URL}/authentication/token`,
      { username, password }
    );
  }
}
