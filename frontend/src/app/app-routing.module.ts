import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/items/all',
    pathMatch: 'full',
  },
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
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'items/newItem',
    loadChildren: () =>
      import('./pages/new-item/new-item.module').then((m) => m.NewItemModule),
    canActivate: [loginGuard],
  },
  {
    path: 'items/all',
    loadChildren: () =>
      import('./pages/all-items/all-items.module').then(
        (m) => m.AllItemsModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
