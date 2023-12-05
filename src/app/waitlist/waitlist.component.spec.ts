import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistComponent } from './waitlist.component';

describe('WaitlistComponent', () => {
  let component: WaitlistComponent;
  let fixture: ComponentFixture<WaitlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitlistComponent]
    });
    fixture = TestBed.createComponent(WaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
