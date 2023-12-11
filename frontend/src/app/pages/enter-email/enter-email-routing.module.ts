import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterEmailComponent } from './enter-email.component';

const routes: Routes = [{ path: '', component: EnterEmailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterEmailRoutingModule { }
