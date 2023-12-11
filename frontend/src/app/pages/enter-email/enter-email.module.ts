import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterEmailRoutingModule } from './enter-email-routing.module';
import { EnterEmailComponent } from './enter-email.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EnterEmailComponent],
  imports: [CommonModule, EnterEmailRoutingModule, ReactiveFormsModule],
})
export class EnterEmailModule {}
