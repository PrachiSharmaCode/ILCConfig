import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatntCriteriaComponent } from './constatnt-criteria.component';

describe('ConstatntCriteriaComponent', () => {
  let component: ConstatntCriteriaComponent;
  let fixture: ComponentFixture<ConstatntCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstatntCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatntCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
