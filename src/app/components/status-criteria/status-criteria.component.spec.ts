import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusCriteriaComponent} from './status-criteria.component';

describe('StatusCriteriaComponent', () => {
  let component: StatusCriteriaComponent;
  let fixture: ComponentFixture<StatusCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCriteriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
