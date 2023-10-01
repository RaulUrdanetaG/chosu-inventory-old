import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllItemsRoutingModule } from './all-items-routing.module';
import { AllItemsComponent } from './all-items.component';
import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';


@NgModule({
  declarations: [
    AllItemsComponent
  ],
  imports: [
    CommonModule,
    SideBarComponent,
    AllItemsRoutingModule
  ]
})
export class AllItemsModule { }
