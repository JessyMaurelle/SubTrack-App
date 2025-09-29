import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDialog } from './add-edit-dialog';

describe('AddEditDialog', () => {
  let component: AddEditDialog;
  let fixture: ComponentFixture<AddEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
