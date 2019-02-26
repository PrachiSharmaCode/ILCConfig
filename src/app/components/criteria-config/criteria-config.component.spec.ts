import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaConfigComponent } from './criteria-config.component';

describe('CriteriaConfigComponent', () => {
  let component: CriteriaConfigComponent;
  let fixture: ComponentFixture<CriteriaConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
