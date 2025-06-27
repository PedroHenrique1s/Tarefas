
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private _poNotification: PoNotificationService) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // **Este é o seu novo método de login que fará a requisição HTTP**
  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Indica que estamos enviando JSON
      }),
    };

    let payload = {
      email: email,
      senha: password,
    };

    return this.http
      .post<any>(`${environment.apiUrl}/login`, payload, httpOptions)
      .pipe(
        map((user) => {
          // Sua API deve retornar um objeto que contenha o token JWT
          // Adapte 'user.token' para o nome da propriedade que sua API usa para o token
          if (user && user.token) {
            // Armazena o objeto completo do usuário (incluindo o token) no localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Atualiza o BehaviorSubject para que todos os componentes inscritos saibam que o usuário logou
            this.currentUserSubject.next(user);
          }
          return user; // Retorna o objeto do usuário (ou apenas o token, dependendo do que sua API retorna)
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.currentUserValue?.refreshToken;

    if (!refreshToken)
      return new Observable((observer) => observer.error('No refresh token'));

    return this.http
      .post<any>(`${environment.apiUrl}/refresh-token`, { refreshToken })
      .pipe(
        map((newTokens) => {
          const currentUser = this.currentUserValue;
          const updatedUser = {
            ...currentUser,
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
          };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
          return updatedUser;
        })
      );
  }

  // Seu método isAuthenticated foi adaptado para verificar se há um usuário no currentUserSubject
  isAuthenticated(): boolean {
    // Retorna true se houver um usuário (e, consequentemente, um token)
    return this.currentUserSubject.value !== null;
  }

  logout(): void {
    const token = this.getToken();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get(`${environment.apiUrl}/logout`, { headers }).subscribe({
        next: (res: any) => {
          this._poNotification.warning(res.mensagem);
          this.finalizarLogout();
        },
        error: (err) => {
          console.warn(
            'Erro ao fazer logout na API. Forçando logout local.',
            err
          );
          this.finalizarLogout();
        },
      });
    } else {
      this.finalizarLogout();
    }
  }

  private finalizarLogout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  // Método auxiliar para obter o token JWT, útil para enviar em outras requisições
  getToken(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.token ? currentUser.token : null;
  }
}
