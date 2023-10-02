import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTagModalComponent } from './update-tag-modal.component';

describe('UpdateTagModalComponent', () => {
  let component: UpdateTagModalComponent;
  let fixture: ComponentFixture<UpdateTagModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTagModalComponent]
    });
    fixture = TestBed.createComponent(UpdateTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
