import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIniComponent } from './menu-ini.component';

describe('MenuIniComponent', () => {
  let component: MenuIniComponent;
  let fixture: ComponentFixture<MenuIniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuIniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuIniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
