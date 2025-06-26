
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5161/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
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
  login(email: string, password: string ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Indica que estamos enviando JSON
      }),
    };

    let payload = {
      email: email,
      senha:password
    }

    return this.http.post<any>(this.apiUrl, payload, httpOptions).pipe(
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

  // Seu método isAuthenticated foi adaptado para verificar se há um usuário no currentUserSubject
  isAuthenticated(): boolean {
    // Retorna true se houver um usuário (e, consequentemente, um token)
    return this.currentUserSubject.value !== null;
  }

  // Seu método logout, agora para limpar o token do localStorage
  logout(): void {
    // Remove o item 'currentUser' do localStorage
    localStorage.removeItem('currentUser');
    // Limpa o BehaviorSubject, notificando os componentes que o usuário deslogou
    this.currentUserSubject.next(null);
  }

  // Método auxiliar para obter o token JWT, útil para enviar em outras requisições
  getToken(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.token ? currentUser.token : null;
  }
}
