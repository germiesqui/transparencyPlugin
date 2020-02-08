import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionCategoryComponent } from './emotion-category.component';

describe('EmotionCategoryComponent', () => {
  let component: EmotionCategoryComponent;
  let fixture: ComponentFixture<EmotionCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
