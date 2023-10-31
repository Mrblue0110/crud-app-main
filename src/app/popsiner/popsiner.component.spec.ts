import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopsinerComponent } from './popsiner.component';

describe('PopsinerComponent', () => {
  let component: PopsinerComponent;
  let fixture: ComponentFixture<PopsinerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopsinerComponent]
    });
    fixture = TestBed.createComponent(PopsinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
