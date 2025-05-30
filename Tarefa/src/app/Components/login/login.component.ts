import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoSelectOption } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginCustomField, PoPageLoginLiterals, PoPageLoginModule } from '@po-ui/ng-templates';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoPageLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  contactEmail:        string = "Informe seu e-mail valido ao sistema";
  productName:         string = "Gerenciador de Tarefas";
  background:          string = "";
  login:               string = "";
  literals:            string = "";
  loginPattern:        string = "";
  loginError:          string = "";
  passwordError:       string = "";
  customFieldOption:   any;
  loginErrors:         Array<string> = [];
  passwordErrors:      Array<string> = [];
  properties:          Array<string> = [];
  customFieldOptions:  Array<PoSelectOption>  = [];
  exceededAttempts:    number = 0;
  attempts:            number = 3;  
  loading:             boolean = false;
  showPageBlocked:     boolean = false;

  constructor(
    private _router:Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {}

  loginSubmit(formData: PoPageLogin) {
    this.loading = true;

    if (formData.login === 'admin' && formData.password === 'admin') {
      this.passwordErrors = [];
      this.exceededAttempts = 0;
      this.loginErrors = [];

      this._authService.login(); // <-- Aqui!

      setTimeout(() => {
        this._router.navigate(['tarefas']);
      }, 500);
    } else {
      this.loading = false;
      this.generateAttempts();
      this.passwordErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
      this.loginErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
    }
  }

  addLoginError() {
    this.loginErrors.push(this.loginError);
    this.loginError = '';
  }

  addPasswordError() {
    this.passwordErrors.push(this.passwordError);
    this.passwordError = '';
  }

  private generateAttempts() {
    if (this.attempts >= 1) {
      this.attempts--;
      this.exceededAttempts = this.attempts;
    }
    if (this.attempts === 0) {
      this.showPageBlocked = true;
    }
  }
}
