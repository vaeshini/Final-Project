import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubSerComponent } from './add-sub-ser.component';

describe('AddSubSerComponent', () => {
  let component: AddSubSerComponent;
  let fixture: ComponentFixture<AddSubSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubSerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
