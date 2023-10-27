import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcopyComponent } from './popupcopy.component';

describe('PopupcopyComponent', () => {
  let component: PopupcopyComponent;
  let fixture: ComponentFixture<PopupcopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupcopyComponent]
    });
    fixture = TestBed.createComponent(PopupcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
