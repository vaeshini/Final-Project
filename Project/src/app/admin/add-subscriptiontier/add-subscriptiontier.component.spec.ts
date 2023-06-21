import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptiontierComponent } from './add-subscriptiontier.component';

describe('AddSubscriptiontierComponent', () => {
  let component: AddSubscriptiontierComponent;
  let fixture: ComponentFixture<AddSubscriptiontierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptiontierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscriptiontierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
