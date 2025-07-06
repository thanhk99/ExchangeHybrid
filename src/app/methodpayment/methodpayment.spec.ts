import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Methodpayment } from './methodpayment';

describe('Methodpayment', () => {
  let component: Methodpayment;
  let fixture: ComponentFixture<Methodpayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Methodpayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Methodpayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
