import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard, loginGuard } from 'src/guards/login.guard';

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
    canActivate: [adminGuard],
  },
  {
    path: 'items/all',
    loadChildren: () =>
      import('./pages/all-items/all-items.module').then(
        (m) => m.AllItemsModule
      ),
  },
  {
    path: 'items/updateItem/:itemId',
    loadChildren: () =>
      import('./pages/update-item/update-item.module').then(
        (m) => m.UpdateItemModule
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'tags/all',
    loadChildren: () =>
      import('./pages/tags/tags.module').then((m) => m.TagsModule),
    canActivate: [adminGuard],
  },
  {
    path: 'users/cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
    canActivate: [loginGuard],
  },
  {
    path: 'users/verify/:token/:UID',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
  },
  {
    path: 'password/restorePass/:email',
    loadChildren: () =>
      import('./pages/restore-pass/restore-pass.module').then(
        (m) => m.RestorePassModule
      ),
  },
  {
    path: 'password/enterEmail',
    loadChildren: () =>
      import('./pages/enter-email/enter-email.module').then(
        (m) => m.EnterEmailModule
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
