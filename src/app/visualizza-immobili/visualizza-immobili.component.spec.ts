import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaImmobiliComponent } from './visualizza-immobili.component';

describe('VisualizzaImmobiliComponent', () => {
  let component: VisualizzaImmobiliComponent;
  let fixture: ComponentFixture<VisualizzaImmobiliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaImmobiliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaImmobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
