import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEarnComponent } from './simple-earn.component';

describe('SimpleEarnComponent', () => {
  let component: SimpleEarnComponent;
  let fixture: ComponentFixture<SimpleEarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleEarnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
