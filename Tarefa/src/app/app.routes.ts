import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { TarefasComponent } from './Components/tarefas/tarefas.component';
import { authGuard } from './Guards/auth.guard';
import { MenuComponent } from './Components/menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'tarefas', component: TarefasComponent, canActivate: [authGuard] },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
