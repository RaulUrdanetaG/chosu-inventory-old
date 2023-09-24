import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewItemComponent } from './new-item.component';

const routes: Routes = [{ path: '', component: NewItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewItemRoutingModule { }
