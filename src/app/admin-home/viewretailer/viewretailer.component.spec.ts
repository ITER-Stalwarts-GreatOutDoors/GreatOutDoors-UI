import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewretailerComponent } from './viewretailer.component';

describe('ViewretailerComponent', () => {
  let component: ViewretailerComponent;
  let fixture: ComponentFixture<ViewretailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewretailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewretailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
