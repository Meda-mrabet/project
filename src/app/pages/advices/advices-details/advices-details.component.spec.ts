import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvicesDetailsComponent } from './advices-details.component';

describe('AdvicesDetailsComponent', () => {
  let component: AdvicesDetailsComponent;
  let fixture: ComponentFixture<AdvicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvicesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
