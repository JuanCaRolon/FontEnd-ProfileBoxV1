import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatospersonalesFormComponent } from './datospersonales-form.component';

describe('DatospersonalesFormComponent', () => {
  let component: DatospersonalesFormComponent;
  let fixture: ComponentFixture<DatospersonalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatospersonalesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatospersonalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
