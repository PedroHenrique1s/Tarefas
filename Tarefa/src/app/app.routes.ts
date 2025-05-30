import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { TarefasComponent } from './Components/tarefas/tarefas.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { MenusComponent } from './Pages/menus/menus.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MenusComponent,
    children: [
      { path: 'tarefas', component: TarefasComponent, canActivate: [authGuard] },
      { path: 'usuario', component: UsuariosComponent, canActivate: [authGuard] }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
