import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterReviewComponent } from './enter-review.component';

describe('EnterReviewComponent', () => {
  let component: EnterReviewComponent;
  let fixture: ComponentFixture<EnterReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
