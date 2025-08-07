import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nextstep } from './nextstep';

describe('Nextstep', () => {
  let component: Nextstep;
  let fixture: ComponentFixture<Nextstep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nextstep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nextstep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
