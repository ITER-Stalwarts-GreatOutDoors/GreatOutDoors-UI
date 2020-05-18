import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductmasterComponent } from './addproductmaster.component';

describe('AddproductmasterComponent', () => {
  let component: AddproductmasterComponent;
  let fixture: ComponentFixture<AddproductmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
