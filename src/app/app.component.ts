import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Crud_AngularMaterial_JsonServer';

  constructor(private dialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllprodutos();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
  getAllprodutos(){
      this.api.getProduto()
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          alert("Erro ao listar produtos!")
        }
      })
  }
}
