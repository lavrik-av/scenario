import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppScenariosComponent } from './app-scenarios.component';

describe('AppScenariosComponent', () => {
  let component: AppScenariosComponent;
  let fixture: ComponentFixture<AppScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
