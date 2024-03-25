import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company.interface';
import { Partner } from 'src/app/interfaces/partner.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})

export class EditModalComponent {

  public dataPartner?: Partner;
  public dataCompany?: Company;

  public extraValue: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceived: any,
  ) {
    this.extraValue = dataReceived.extraValue;
    if (this.extraValue) {
      this.dataPartner = dataReceived.data;
    } else {
      this.dataCompany = dataReceived.data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
