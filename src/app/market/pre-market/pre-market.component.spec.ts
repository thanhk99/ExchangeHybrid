import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMarketComponent } from './pre-market.component';

describe('PreMarketComponent', () => {
  let component: PreMarketComponent;
  let fixture: ComponentFixture<PreMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
