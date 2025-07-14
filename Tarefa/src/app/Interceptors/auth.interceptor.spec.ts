import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../Services/auth.service';

describe('AuthInterceptor', () => {
  // Declaração das variáveis que usaremos nos testes.
  let httpMock: HttpTestingController; // Controlador para simular requisições HTTP.
  let httpClient: HttpClient; // Cliente HTTP para disparar as requisições.
  let mockAuthService: jasmine.SpyObj<AuthService>; // Mock do serviço de autenticação.

  /**
   * beforeEach: Executa antes de cada teste ('it').
   * Ideal para configurar o ambiente de teste.
   */
  beforeEach(() => {
    // Criamos um mock para o AuthService com os métodos que o interceptor utiliza.
    // Isso nos permite controlar o que cada método retorna em nossos testes.
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'getToken',
      'refreshToken',
      'logout',
    ]);

    TestBed.configureTestingModule({
      // HttpClientTestingModule é essencial para testar serviços e interceptors que usam HTTP.
      imports: [HttpClientTestingModule],
      providers: [
        // Aqui informamos ao Angular para usar nossa classe AuthInterceptor.
        // O `multi: true` é necessário para interceptors, pois pode haver mais de um.
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        // Fornecemos o nosso mock do AuthService. Quando o AuthInterceptor for criado,
        // o Angular injetará este mock, e não o serviço real.
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    // Injetamos as ferramentas de teste do Angular.
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  /**
   * afterEach: Executa depois de cada teste.
   * Usamos para verificar se não há requisições HTTP pendentes, garantindo que cada teste é limpo.
   */
  afterEach(() => {
    httpMock.verify();
  });

  it('deve adicionar o header de Authorization se o token existir', () => {
    // --- ARRANGE ---
    const testToken = 'meu-token-secreto';
    // Configuramos o mock para retornar um token quando `getToken()` for chamado.
    mockAuthService.getToken.and.returnValue(testToken);

    // --- ACT ---
    // Fazemos uma requisição HTTP. O interceptor será acionado automaticamente.
    httpClient.get('/api/data').subscribe();

    // --- ASSERT ---
    // Esperamos que uma requisição para '/api/data' tenha sido feita.
    const httpRequest = httpMock.expectOne('/api/data');

    // Verificamos se o header 'Authorization' foi adicionado e contém o token correto.
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${testToken}`
    );
  });

  it('NÃO deve adicionar o header de Authorization se o token NÃO existir', () => {
    // --- ARRANGE ---
    // Configuramos o mock para retornar null, simulando um usuário não logado.
    mockAuthService.getToken.and.returnValue(null);

    // --- ACT ---
    httpClient.get('/api/data').subscribe();

    // --- ASSERT ---
    const httpRequest = httpMock.expectOne('/api/data');

    // Verificamos que o header 'Authorization' NÃO foi adicionado.
    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });

  it('deve tentar atualizar o token ao receber erro 401 e refazer a requisição com o novo token', () => {
    // --- ARRANGE ---
    const oldToken = 'token-expirado';
    const newToken = 'novo-token-valido';

    // Simula o estado inicial: usuário tem um token (expirado).
    mockAuthService.getToken.and.returnValue(oldToken);
    // Simula que o `refreshToken` funciona e depois o `getToken` retorna o novo token.
    mockAuthService.refreshToken.and.returnValue(of({})); // `of({})` simula um Observable de sucesso.

    // --- ACT ---
    httpClient.get('/api/data').subscribe();

    // --- ASSERT ---
    // 1. A primeira requisição deve ser feita com o token antigo.
    const firstRequest = httpMock.expectOne('/api/data');
    expect(firstRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${oldToken}`
    );

    // Quando a primeira requisição falhar, o `getToken` será chamado de novo após o refresh.
    // Usamos `.and.returnValue` para mudar o retorno do mock no meio do teste.
    mockAuthService.getToken.and.returnValue(newToken);

    // 2. Simulamos a resposta de erro 401 do servidor para a primeira requisição.
    firstRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    // 3. O interceptor deve ter chamado `refreshToken`.
    expect(mockAuthService.refreshToken).toHaveBeenCalled();

    // 4. Uma segunda requisição para '/api/data' deve ser feita com o NOVO token.
    const secondRequest = httpMock.expectOne('/api/data');
    expect(secondRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${newToken}`
    );

    // Finaliza a segunda requisição com sucesso.
    secondRequest.flush({ data: 'success' });
  });

  it('deve fazer logout se a atualização do token falhar', () => {
    // --- ARRANGE ---
    const oldToken = 'token-expirado';
    mockAuthService.getToken.and.returnValue(oldToken);

    // Simulamos que o `refreshToken` falha.
    mockAuthService.refreshToken.and.returnValue(
      throwError(() => new Error('Refresh failed'))
    );

    // --- ACT ---
    // A inscrição no erro é necessária para capturar a falha final.
    httpClient.get('/api/data').subscribe({
      error: (err) => {
        // --- ASSERT (parte 3) ---
        expect(err).toBeTruthy(); // Verifica se um erro foi propagado.
      },
    });

    // --- ASSERT (parte 1) ---
    const firstRequest = httpMock.expectOne('/api/data');
    firstRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    // --- ASSERT (parte 2) ---
    // O interceptor deve ter chamado `refreshToken`, que falhou.
    expect(mockAuthService.refreshToken).toHaveBeenCalled();
    // E consequentemente, deve ter chamado `logout`.
    expect(mockAuthService.logout).toHaveBeenCalled();
    // Nenhuma nova requisição deve ser feita.
    httpMock.expectNone('/api/data');
  });
});
