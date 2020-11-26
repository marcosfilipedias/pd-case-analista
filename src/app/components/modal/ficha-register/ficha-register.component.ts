import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { ClientRegisterComponent } from '../client-register/client-register.component';

@Component({
  selector: 'app-ficha-register',
  templateUrl: './ficha-register.component.html',
  styleUrls: ['./ficha-register.component.css']
})
export class FichaRegisterComponent implements OnInit {

  modalTitle: string;
  cliente: Client = null;
  plano = null;
  listaProcedimentos = null;
  procedimentoSelecionado = null;

  constructor( 
    public dialogRef: MatDialogRef<ClientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.cliente = this.data.cliente;
    this.plano = this.getPlan(this.cliente.plano);    
    this.listaProcedimentos = this.data.procedimentos;
  }

  getPlan(value: any): any {    
    switch(value){
      case 0: case "STARTER":
        return "Starter";
      case 1: case "ESSENTIALS":
        return "Essentials";
      case 2: case "TOP":
        return "Top";
    }
  }

  cadastrar(){
    console.log(this.procedimentoSelecionado)
  }
}
