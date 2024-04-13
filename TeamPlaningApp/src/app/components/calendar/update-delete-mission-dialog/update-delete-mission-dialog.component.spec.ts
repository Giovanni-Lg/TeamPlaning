import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteMissionDialogComponent } from './update-delete-mission-dialog.component';

describe('UpdateDeleteMissionDialogComponent', () => {
  let component: UpdateDeleteMissionDialogComponent;
  let fixture: ComponentFixture<UpdateDeleteMissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeleteMissionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteMissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
