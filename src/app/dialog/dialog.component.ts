import { ApiService } from './../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  situacaoLista = ["Ativo","Inativo"];
  produtoForm!: FormGroup;
  actionBtn : String = "Salvar"

  constructor( private formbuilder: FormBuilder,
              private api : ApiService,
              @Inject (MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.produtoForm = this.formbuilder.group({
      nome:       ['', Validators.required],
      categoria : ['', Validators.required],
      validade :  ['', Validators.required],
      situacao :  ['', Validators.required],
      preco :     ['', Validators.required],
      comentario: ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Atualizar";
      this.produtoForm.controls['nome'].setValue(this.editData.nome);
      this.produtoForm.controls['categoria'].setValue(this.editData.categoria);
      this.produtoForm.controls['validade'].setValue(this.editData.validade);
      this.produtoForm.controls['situacao'].setValue(this.editData.situacao);
      this.produtoForm.controls['preco'].setValue(this.editData.preco);
      this.produtoForm.controls['comentario'].setValue(this.editData.comentario);
    }
  }

  addProduto(){
    if(!this.editData){
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
    }else{
      this.updateProduto()
    }
  }
  updateProduto(){
    this.api.putProduto(this.produtoForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Produto Atualizado com Sucesso!")
        this.produtoForm.reset();
        this.dialogRef.close('Atualizar')
      },
      error:()=>{
        alert("Erro ao atualizar produto!")
      }
    })
  }
}
