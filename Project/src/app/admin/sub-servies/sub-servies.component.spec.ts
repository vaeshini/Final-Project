import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiesComponent } from './sub-servies.component';

describe('SubServiesComponent', () => {
  let component: SubServiesComponent;
  let fixture: ComponentFixture<SubServiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubServiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubServiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
