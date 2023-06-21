import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscritpiontierComponent } from './edit-subscritpiontier.component';

describe('EditSubscritpiontierComponent', () => {
  let component: EditSubscritpiontierComponent;
  let fixture: ComponentFixture<EditSubscritpiontierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscritpiontierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscritpiontierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
