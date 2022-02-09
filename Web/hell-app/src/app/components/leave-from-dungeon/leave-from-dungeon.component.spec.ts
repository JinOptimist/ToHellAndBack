import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFromDungeonComponent } from './leave-from-dungeon.component';

describe('LeaveFromDungeonComponent', () => {
  let component: LeaveFromDungeonComponent;
  let fixture: ComponentFixture<LeaveFromDungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveFromDungeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveFromDungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
