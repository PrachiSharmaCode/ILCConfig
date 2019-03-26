import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperCriteriaComponent } from './mapper-criteria.component';

describe('MapperCriteriaComponent', () => {
  let component: MapperCriteriaComponent;
  let fixture: ComponentFixture<MapperCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
