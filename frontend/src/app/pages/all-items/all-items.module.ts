import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllItemsRoutingModule } from './all-items-routing.module';
import { AllItemsComponent } from './all-items.component';
import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';
import { ItemsComponent } from 'src/app/components/items/items.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

@NgModule({
  declarations: [AllItemsComponent],
  imports: [
    CommonModule,
    SideBarComponent,
    ItemsComponent,
    AllItemsRoutingModule,
    SearchBarComponent,
  ],
})
export class AllItemsModule {}
