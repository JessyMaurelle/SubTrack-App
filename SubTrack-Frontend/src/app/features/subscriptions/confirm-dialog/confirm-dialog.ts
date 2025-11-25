import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogActions, MatDialogModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  
    constructor(
      private dialogRef: MatDialogRef<ConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}
  
    onCancel() {
      this.dialogRef.close(false);
    }
  
    onConfirm() {
      this.dialogRef.close(true);
    }
}
