import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Procedimento } from 'src/app/model/procedimento.model';

@Component({
  selector: 'app-procedimento-register',
  templateUrl: './procedimento-register.component.html',
  styleUrls: ['./procedimento-register.component.css']
})
export class ProcedimentoRegisterComponent implements OnInit {
  
  modalTitle: string;
  procedimento: Procedimento = null;
  plano = '';

  constructor(
    public dialogRef: MatDialogRef<ProcedimentoRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.plano = this.data.procedimento != null ? this.getPlan(this.data.procedimento.plano) : null;
    this.procedimento = this.data.procedimento != null ? this.data.procedimento : new Procedimento();
    this.modalTitle = this.data.procedimento != null ? 'Editar procedimento':'Cadastrar procedimento';
  }

  save(){
    if(this.checkField()){
      this.procedimento.plano = this.plano;
      this.dialogRef.close(this.procedimento);
    }
  }

  close(){
    this.dialogRef.close(null);
  }

  checkField(){
    if(this.procedimento.nome == '' || this.plano == '' ){
      this.msgService.warning('Os campos com são obrigatórios.');
      return false;
    }else{
      return true;
    }
  }

  getPlan(value: any): any {    
    switch(value){
      case 0: case "Starter":
        return "STARTER";
      case 1: case "Essentials":
        return "ESSENTIALS";
      case 2: case "Top":
        return "TOP";
    }
  }
}
