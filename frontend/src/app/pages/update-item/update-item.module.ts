import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateItemRoutingModule } from './update-item-routing.module';
import { UpdateItemComponent } from './update-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [UpdateItemComponent],
  imports: [
    CommonModule,
    UpdateItemRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class UpdateItemModule {}
