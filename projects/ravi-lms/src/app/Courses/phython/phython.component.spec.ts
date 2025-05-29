import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhythonComponent } from './phython.component';

describe('PhythonComponent', () => {
  let component: PhythonComponent;
  let fixture: ComponentFixture<PhythonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhythonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
