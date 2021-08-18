import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothWomenComponent } from './cloth-women.component';

describe('ClothWomenComponent', () => {
  let component: ClothWomenComponent;
  let fixture: ComponentFixture<ClothWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothWomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
