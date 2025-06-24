import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingWallet } from './funding-wallet';

describe('FundingWallet', () => {
  let component: FundingWallet;
  let fixture: ComponentFixture<FundingWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundingWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
