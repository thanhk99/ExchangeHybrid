import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firststep } from './firststep';

describe('Firststep', () => {
  let component: Firststep;
  let fixture: ComponentFixture<Firststep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Firststep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Firststep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
