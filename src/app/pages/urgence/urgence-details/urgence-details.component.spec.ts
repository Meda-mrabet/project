import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgenceDetailsComponent } from './urgence-details.component';

describe('UrgenceDetailsComponent', () => {
  let component: UrgenceDetailsComponent;
  let fixture: ComponentFixture<UrgenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrgenceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
