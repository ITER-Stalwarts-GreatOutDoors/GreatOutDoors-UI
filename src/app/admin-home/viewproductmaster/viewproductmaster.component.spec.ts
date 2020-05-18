import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductmasterComponent } from './viewproductmaster.component';

describe('ViewproductmasterComponent', () => {
  let component: ViewproductmasterComponent;
  let fixture: ComponentFixture<ViewproductmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewproductmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewproductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
