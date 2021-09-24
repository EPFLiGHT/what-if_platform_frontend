import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductionRateComponent } from './reproduction-rate.component';

describe('ReproductionRateComponent', () => {
  let component: ReproductionRateComponent;
  let fixture: ComponentFixture<ReproductionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReproductionRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproductionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
