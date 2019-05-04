import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaCriteriaComponent} from './formula-criteria.component';

describe('FormulaCriteriaComponent', () => {
  let component: FormulaCriteriaComponent;
  let fixture: ComponentFixture<FormulaCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaCriteriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
