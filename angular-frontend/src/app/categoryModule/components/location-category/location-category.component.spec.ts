import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCategoryComponent } from './location-category.component';

describe('LocationCategoryComponent', () => {
  let component: LocationCategoryComponent;
  let fixture: ComponentFixture<LocationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
