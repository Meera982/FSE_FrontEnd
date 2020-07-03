import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskWindowComponent } from './update-task-window.component';

describe('UpdateTaskWindowComponent', () => {
  let component: UpdateTaskWindowComponent;
  let fixture: ComponentFixture<UpdateTaskWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTaskWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
