import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothMenComponent } from './cloth-men.component';

describe('ClothMenComponent', () => {
  let component: ClothMenComponent;
  let fixture: ComponentFixture<ClothMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothMenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
