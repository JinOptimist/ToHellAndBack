import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfLevelComponent } from './end-of-level.component';

describe('EndOfLevelComponent', () => {
  let component: EndOfLevelComponent;
  let fixture: ComponentFixture<EndOfLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
