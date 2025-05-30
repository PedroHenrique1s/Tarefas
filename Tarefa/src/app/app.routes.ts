import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './Pages/tarefas/tarefas.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { LoginComponent } from './Pages/login/login.component';
// import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'tarefas', component: TarefasComponent },
  { path: 'usuario', component: UsuarioComponent },
];
