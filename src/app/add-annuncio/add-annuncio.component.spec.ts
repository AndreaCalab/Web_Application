import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnuncioComponent } from './add-annuncio.component';

describe('AddAnnuncioComponent', () => {
  let component: AddAnnuncioComponent;
  let fixture: ComponentFixture<AddAnnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
