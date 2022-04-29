import { DialogComponent } from './dialog/dialog.component';
import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Crud_AngularMaterial_JsonServer';

  constructor(private dialog: MatDialog){

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'

    });
  }
}
