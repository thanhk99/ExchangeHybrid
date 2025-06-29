import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrageDataComponent } from './arbitrage-data.component';

describe('ArbitrageDataComponent', () => {
  let component: ArbitrageDataComponent;
  let fixture: ComponentFixture<ArbitrageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitrageDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitrageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
