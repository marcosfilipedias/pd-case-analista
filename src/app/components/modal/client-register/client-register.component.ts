import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { PlanoPipe } from 'src/app/utils/plano.pipe';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  modalTitle: string;
  client: Client = null;
  email = new FormControl();
  dataNascimento = new Date();

  constructor(
    public dialogRef: MatDialogRef<ClientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
    private planoPipe : PlanoPipe
  ) { }

  ngOnInit() {
    this.client = this.data.client != null ? this.data.client : new Client();
    this.email.setValue(this.client.email);
    this.dataNascimento = new Date(this.data.client.dataNascimento);
    this.modalTitle = this.data.client != null ? 'Editar Cliente':'Cadastrar Cliente';
  }

  save(){
    if(this.checkField()){
      this.client.email = this.email.value
      this.client.plano = this.planoPipe.transform(this.client.plano);
      this.client.dataNascimento = this.dataNascimento.getTime()
      this.dialogRef.close(this.client);
    }
  }

  close(){
    this.dialogRef.close(null);
  }

  checkField(){
    if(this.client.nome == '' || this.client.cpf == '' ){
      this.msgService.warning('Os campos com ** são obrigatórios.');
      return false;
    }else if(!this.email.valid){
      this.msgService.warning('Email invalido');
      return false;
    }else{
      return true;
    }
  }
}
