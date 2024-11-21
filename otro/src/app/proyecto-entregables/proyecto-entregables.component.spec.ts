import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoEntregablesComponent } from './proyecto-entregables.component';

describe('ProyectoEntregablesComponent', () => {
  let component: ProyectoEntregablesComponent;
  let fixture: ComponentFixture<ProyectoEntregablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectoEntregablesComponent]
    });
    fixture = TestBed.createComponent(ProyectoEntregablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
