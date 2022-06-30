import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOfOrdonnanceComponent } from './file-of-ordonnance.component';

describe('FileOfOrdonnanceComponent', () => {
  let component: FileOfOrdonnanceComponent;
  let fixture: ComponentFixture<FileOfOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOfOrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOfOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
