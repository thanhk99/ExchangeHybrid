import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkxIndexComponent } from './okx-index.component';

describe('OkxIndexComponent', () => {
  let component: OkxIndexComponent;
  let fixture: ComponentFixture<OkxIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OkxIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OkxIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
