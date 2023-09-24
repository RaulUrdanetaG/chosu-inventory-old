import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewItemRoutingModule } from './new-item-routing.module';
import { NewItemComponent } from './new-item.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewItemComponent
  ],
  imports: [
    CommonModule,
    NewItemRoutingModule,
    ReactiveFormsModule,
  ]
})
export class NewItemModule { }
