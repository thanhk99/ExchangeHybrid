import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAdvertisement } from './select-advertisement';

describe('SelectAdvertisement', () => {
  let component: SelectAdvertisement;
  let fixture: ComponentFixture<SelectAdvertisement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAdvertisement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAdvertisement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
