import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnemploymentRateComponent } from './unemployment-rate.component';

describe('UnemploymentRateComponent', () => {
  let component: UnemploymentRateComponent;
  let fixture: ComponentFixture<UnemploymentRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnemploymentRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnemploymentRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
