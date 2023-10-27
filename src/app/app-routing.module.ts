import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LinkComponent } from './link/link.component';
import { SelectorComponent } from './selector/selector.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'notfound/:id', component: NotfoundComponent},
  { path: 'creator', component: SelectorComponent },
  { path: 'link/:id', component: LinkComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
