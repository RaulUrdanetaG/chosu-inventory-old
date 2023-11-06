import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class UpdateModalComponent {}
