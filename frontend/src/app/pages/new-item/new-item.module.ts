import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewItemRoutingModule } from './new-item-routing.module';
import { NewItemComponent } from './new-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTagModalComponent } from 'src/app/components/new-tag-modal/new-tag-modal.component';

@NgModule({
  declarations: [NewItemComponent],
  imports: [
    CommonModule,
    NewItemRoutingModule,
    ReactiveFormsModule,
    NewTagModalComponent,
  ],
})
export class NewItemModule {}
