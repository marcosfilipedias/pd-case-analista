import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { ClientRegisterComponent } from '../client-register/client-register.component';

@Component({
  selector: 'app-ficha-register',
  templateUrl: './ficha-register.component.html',
  styleUrls: ['./ficha-register.component.css']
})
export class FichaRegisterComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  modalTitle: string;
  cliente: Client = null;
  plano = null;
  listaProcedimentos = null;
  procedimentoSelecionado = null;

  dataProcTable = new MatTableDataSource<any>();
  columnsProc = ['name', 'data']

  constructor( 
    public dialogRef: MatDialogRef<ClientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
    private procedimentoService: ProcedimentoService,
  ) { }

  ngOnInit() {
    this.cliente = this.data.cliente;
    this.plano = this.getPlan(this.cliente.plano);    
    this.listaProcedimentos = this.data.procedimentos;
    this.buscarProcedimentoRealizados();
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

  marcarProcedimento(){
    this.blockUI.start();
    this.procedimentoService.marcarPocedimento(this.procedimentoSelecionado.id, this.cliente.id).subscribe(
      res => {
        this.blockUI.stop();
        if(res){
          this.msgService.success("Procedimento liberado!")
          this.buscarProcedimentoRealizados()
        }else{
          this.msgService.warning("O plano do cliente não contempla o procedimento solicitado!")
        }
      }
    )
  }

  buscarProcedimentoRealizados(){
    this.procedimentoService.buscarProcedimentoRealizados(this.cliente.id).subscribe(
      res => this.dataProcTable = new MatTableDataSource(res)
    )
  }
}
