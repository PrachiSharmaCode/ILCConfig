import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryCriteriaComponent} from './history-criteria.component';

describe('HistoryCriteriaComponent', () => {
  let component: HistoryCriteriaComponent;
  let fixture: ComponentFixture<HistoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryCriteriaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
