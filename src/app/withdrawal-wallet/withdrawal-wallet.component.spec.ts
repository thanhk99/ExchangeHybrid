import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalWalletComponent } from './withdrawal-wallet.component';

describe('WithdrawalWalletComponent', () => {
  let component: WithdrawalWalletComponent;
  let fixture: ComponentFixture<WithdrawalWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawalWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
