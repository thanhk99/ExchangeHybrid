import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAds } from './create-ads';

describe('CreateAds', () => {
  let component: CreateAds;
  let fixture: ComponentFixture<CreateAds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
