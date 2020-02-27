import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilityCategoryComponent } from './accesibility-category.component';

describe('AccesibilityCategoryComponent', () => {
  let component: AccesibilityCategoryComponent;
  let fixture: ComponentFixture<AccesibilityCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesibilityCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesibilityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
