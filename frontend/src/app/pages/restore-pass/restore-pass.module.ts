import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestorePassRoutingModule } from './restore-pass-routing.module';
import { RestorePassComponent } from './restore-pass.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RestorePassComponent],
  imports: [CommonModule, RestorePassRoutingModule, ReactiveFormsModule],
})
export class RestorePassModule {}
