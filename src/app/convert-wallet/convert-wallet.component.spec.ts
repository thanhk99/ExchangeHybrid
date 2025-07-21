import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertWalletComponent } from './convert-wallet.component';

describe('ConvertWalletComponent', () => {
  let component: ConvertWalletComponent;
  let fixture: ComponentFixture<ConvertWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
