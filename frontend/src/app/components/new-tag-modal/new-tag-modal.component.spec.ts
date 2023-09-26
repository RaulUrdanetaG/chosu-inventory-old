import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagModalComponent } from './new-tag-modal.component';

describe('NewTagModalComponent', () => {
  let component: NewTagModalComponent;
  let fixture: ComponentFixture<NewTagModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTagModalComponent]
    });
    fixture = TestBed.createComponent(NewTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
