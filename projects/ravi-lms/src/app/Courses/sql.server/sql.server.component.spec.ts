import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlServerComponent } from './sql.server.component';

describe('SqlServerComponent', () => {
  let component: SqlServerComponent;
  let fixture: ComponentFixture<SqlServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
