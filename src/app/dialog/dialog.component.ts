import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  situacaoLista = ["Ativo","Inativo"];
  produtoForm!: FormGroup;

  constructor( private formbuilder: FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.produtoForm = this.formbuilder.group({
      nome:       ['', Validators.required],
      categoria : ['', Validators.required],
      validade :  ['', Validators.required],
      situacao :  ['', Validators.required],
      preco :     ['', Validators.required],
      comentario: ['', Validators.required],
    })
  }

  addProduto(){
    if(this.produtoForm.valid){
      this.api.postProduto(this.produtoForm.value)
      .subscribe({
        next:(res)=>{
          alert("Produto cadastrado com Sucesso!!");
          this.produtoForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Erro ao cadastrar o produto!")
        }
      })
    }
  }
}
