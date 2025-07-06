import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigTransaction } from './big-transaction';

describe('BigTransaction', () => {
  let component: BigTransaction;
  let fixture: ComponentFixture<BigTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigTransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
