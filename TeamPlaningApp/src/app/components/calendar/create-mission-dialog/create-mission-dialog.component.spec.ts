import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMissionDialogComponent } from './create-mission-dialog.component';

describe('CreateMissionDialogComponent', () => {
  let component: CreateMissionDialogComponent;
  let fixture: ComponentFixture<CreateMissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMissionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
