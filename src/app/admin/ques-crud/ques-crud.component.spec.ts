import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesCrudComponent } from './ques-crud.component';

describe('QuesCrudComponent', () => {
  let component: QuesCrudComponent;
  let fixture: ComponentFixture<QuesCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
