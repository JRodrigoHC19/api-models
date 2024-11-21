import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProyectoComponent } from './detalles-proyecto.component';

describe('DetallesProyectoComponent', () => {
  let component: DetallesProyectoComponent;
  let fixture: ComponentFixture<DetallesProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesProyectoComponent]
    });
    fixture = TestBed.createComponent(DetallesProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
