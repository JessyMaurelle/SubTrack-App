import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-add-edit-dialog',
  imports: [MatInputModule, MatOptionModule, MatSelectModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-edit-dialog.html',
  styleUrl: './add-edit-dialog.scss'
})
export class AddEditDialog {
  form: FormGroup;

  
    private fb = inject (FormBuilder);
    private dialogRef = inject (MatDialogRef<AddEditDialog>);
    public data = inject (MAT_DIALOG_DATA) ;
    categories: string[] = [];
  
  constructor()  {
    console.log('Categories reçues dans le dialog:', this.categories);
    this.categories = this.data?.categories || [];

    this.form = this.fb.group({
      name: [this.data.subscription?.name || '', Validators.required],
      category: [this.data.subscription?.category || (this.categories.length > 0 ? this.categories[0] : ''), 
      Validators.required
    ],
      cycle: [this.data.subscription?.cycle || 'monthly', Validators.required],
      price: [this.data.subscription?.price || 0, Validators.required],
      currency: [this.data.subscription?.currency || 'EUR'],
      status: [this.data.subscription?.status || 'active', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      //this.dialogRef.close(this.form.value);
       // Si pas de date saisie, on calcule automatiquement
       const subscription = this.form.value;
    if (!subscription.nextChargeDate) {
      const today = new Date();
      if (subscription.cycle.toLowerCase() === 'monthly') {
        today.setMonth(today.getMonth() + 1);
      } else if (subscription.cycle.toLowerCase() === 'yearly') {
        today.setFullYear(today.getFullYear() + 1);
      }
      subscription.nextChargeDate = today.toISOString().split('T')[0]; // format YYYY-MM-DD
    }

    this.dialogRef.close(subscription);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
