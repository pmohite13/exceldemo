import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeofficeBifurcationComponent } from './timeoffice-bifurcation.component';

describe('TimeofficeBifurcationComponent', () => {
  let component: TimeofficeBifurcationComponent;
  let fixture: ComponentFixture<TimeofficeBifurcationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeofficeBifurcationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeofficeBifurcationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
