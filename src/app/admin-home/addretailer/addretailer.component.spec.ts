import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddretailerComponent } from './addretailer.component';

describe('AddretailerComponent', () => {
  let component: AddretailerComponent;
  let fixture: ComponentFixture<AddretailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddretailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddretailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
