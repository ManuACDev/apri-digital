import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaPageComponent } from './consultoria-page.component';

describe('ConsultoriaPageComponent', () => {
  let component: ConsultoriaPageComponent;
  let fixture: ComponentFixture<ConsultoriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultoriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
