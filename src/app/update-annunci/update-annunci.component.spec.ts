import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnunciComponent } from './update-annunci.component';

describe('UpdateAnnunciComponent', () => {
  let component: UpdateAnnunciComponent;
  let fixture: ComponentFixture<UpdateAnnunciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnnunciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnnunciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
