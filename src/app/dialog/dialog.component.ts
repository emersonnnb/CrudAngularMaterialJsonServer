import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  situacaoLista = ["Ativo","Inativo"]

  produtoForm!: FormGroup;

  constructor( private formbuilder: FormBuilder) { }

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
    console.log(this.produtoForm.value);
  }

}
