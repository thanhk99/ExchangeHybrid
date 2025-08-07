import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pmarket } from './p2pmarket';

describe('P2pmarket', () => {
  let component: P2pmarket;
  let fixture: ComponentFixture<P2pmarket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [P2pmarket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2pmarket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
