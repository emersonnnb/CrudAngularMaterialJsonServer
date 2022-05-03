import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Crud_AngularMaterial_JsonServer';

  displayedColumns: string[] = ['nome', 'categoria', 'validade', 'situacao', 'preco', 'comentario', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllprodutos();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Salvar'){
        this.getAllprodutos();
      }
    })
  }
  getAllprodutos(){
      this.api.getProduto()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("Erro ao listar produtos!")
        }
      })
  }
  editProdutos(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'Atualizar'){
        this.getAllprodutos();
      }
    })
  }
  deleteProduto(id : number){
    this.api.deleteProduto(id)
    .subscribe({
      next:(res)=>{
        alert("Produto deletado com sucesso")
        this.getAllprodutos();
      },
      error:()=>{
        alert("Erro ao deletar!!")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
