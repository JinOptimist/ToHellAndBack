import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelResearchActionPanelComponent } from './level-research-action-panel.component';

describe('LevelResearchActionPanelComponent', () => {
  let component: LevelResearchActionPanelComponent;
  let fixture: ComponentFixture<LevelResearchActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelResearchActionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelResearchActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
