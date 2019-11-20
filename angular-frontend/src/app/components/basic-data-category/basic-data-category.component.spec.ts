import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataCategoryComponent } from './basic-data-category.component';

describe('BasicDataCategoryComponent', () => {
  let component: BasicDataCategoryComponent;
  let fixture: ComponentFixture<BasicDataCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDataCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
