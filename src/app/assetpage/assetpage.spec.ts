import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assetpage } from './assetpage';

describe('Assetpage', () => {
  let component: Assetpage;
  let fixture: ComponentFixture<Assetpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Assetpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assetpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
