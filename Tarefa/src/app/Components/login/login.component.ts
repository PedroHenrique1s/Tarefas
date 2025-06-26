import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginCustomField, PoPageLoginLiterals, PoPageLoginModule } from '@po-ui/ng-templates';
import { AuthService } from '../../Services/auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoPageLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  productName: string = 'Gerenciador de Tarefas';
  background: string = 'assets/img.png';
  passwordError: string = '';
  loading: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    // Opcional: Se o usuário já estiver logado (token no localStorage), redireciona
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['tarefas']); // Redirecione para a rota desejada
    }
  }

  async loginSubmit(formData: PoPageLogin) {
    this.loading = true;
    try{
      const authToken = await firstValueFrom(
        this._authService.login(formData.login, formData.password)
      );
      this.loading = false;
      this._router.navigate(['tarefas']);
    }catch(error){
      let mensagemErro = error as HttpErrorResponse;
      this.loading = false; // Desativa loading
      this._poNotification.warning(mensagemErro.error.mensagem);
    }
  }
}
