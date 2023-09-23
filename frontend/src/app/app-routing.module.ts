import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users/login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users/register',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
