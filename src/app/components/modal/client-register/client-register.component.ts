import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  modalTitle: string;
  client: Client = null;
  email = new FormControl();
  
  constructor(
    public dialogRef: MatDialogRef<ClientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.client = this.data.client != null ? this.data.client : new Client();
    this.email.setValue(this.client.email);
    this.modalTitle = this.data.client != null ? 'Editar Cliente':'Cadastrar Cliente';
  }

  save(){
    if(this.checkField()){
      this.client.email = this.email.value
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
