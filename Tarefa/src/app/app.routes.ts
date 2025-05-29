import { Routes } from '@angular/router';
import { TarefasComponent } from './Pages/tarefas/tarefas.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';

export const routes: Routes = [
  { path: 'tarefas', component: TarefasComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' }, // rota padrão opcional
  { path: '**', redirectTo: 'tarefas' } // fallback para rotas inexistentes
];
