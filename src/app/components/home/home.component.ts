import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { Procedimento } from 'src/app/model/procedimento.model';
import { ClientService } from 'src/app/services/client.service';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { ClientRegisterComponent } from '../modal/client-register/client-register.component';
import { ConfirmActionComponent } from '../modal/confirm-action/confirm-action.component';
import { FichaRegisterComponent } from '../modal/ficha-register/ficha-register.component';
import { ProcedimentoRegisterComponent } from '../modal/procedimento-register/procedimento-register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  dataTable = new MatTableDataSource<Client>();
  columns = ['options', 'name', 'sexo', 'cpf', 'data', 'email', 'phone', 'plano']

  dataProcTable = new MatTableDataSource<Procedimento>();
  columnsProc = ['options', 'name', 'plano']

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    private msgService: ToastrService,
    private procedimentoService : ProcedimentoService,
  ) { }

  ngOnInit() {
    this.readAllClients();
    this.buscarProcedimentos();
  }

  readAllClients(){
    this.blockUI.start();
    this.clientService.readAllClients().subscribe(
      result => {
        this.dataTable = new MatTableDataSource(result);
        this.blockUI.stop()
      }, error => {
        this.msgService.error('Verifique se o servidor esta ativo!', 'Erro')
        this.blockUI.stop()
      }
    )
  }

  applyFilter(event: Event) {
    this.filterConfiguration();
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  filterConfiguration(){
    this.dataTable.filterPredicate = (data: Client, filter: string) => data.nome.indexOf(filter) != -1 || data.email.indexOf(filter) != -1 || data.email.indexOf(filter) != -1;
  }

  openClientModal(client){
    let dialogRef = this.dialog.open(ClientRegisterComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {client: client}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res != null){
          if(res.id == null){
            this.createClient(res);
          }else{
            this.updateClient(res);
          }
        }
      }
    );
  }

  createClient(client:Client){
    this.blockUI.start();
    this.clientService.createClient(client).subscribe(
      res => {
        this.blockUI.stop();
        this.msgService.success('Cliente cadastrado.')
        this.readAllClients()
      }
    )
  }

  updateClient(client:Client){
    this.blockUI.start();
    this.clientService.updateClient(client).subscribe(
      res => {
        this.blockUI.stop();
        this.msgService.success('Cliente atualizado.')
        this.readAllClients();
      }
    )
  }

  deleteUser(client:any){
    let dialogRef = this.dialog.open(ConfirmActionComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {text: 'Deseja excluir o cliente ' + client.nome + '?'}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res){
          this.blockUI.start()
          this.clientService.deleteClient(client.id).subscribe(
            res => {
              this.msgService.success('cliente deletado.')
              this.blockUI.stop()
              this.readAllClients();
            }, error => {
              this.msgService.error('Erro ao deletar cliente.')
              this.blockUI.stop()
            }
          )
        }
      }
    )
  }

  applyProcFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataProcTable.filter = filterValue.trim().toLowerCase();
  }

  buscarProcedimentos(){
    this.blockUI.start()
    this.procedimentoService.readAll().subscribe(
      res => {
        this.dataProcTable = new MatTableDataSource(res);
        this.blockUI.stop()
      }, error => {
        this.msgService.error('Erro buscar procedimentos.')
        this.blockUI.stop()
      }
    )
  }

  openProcedimentoModal(procedimento){
    let dialogRef = this.dialog.open(ProcedimentoRegisterComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {procedimento: procedimento}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res != null){
          if(res.id == null){
            this.createProcedimento(res);
          }else{
            this.updateProcedimento(res);
          }
        }
      }
    );
  }

  createProcedimento(proc:Procedimento){
    this.blockUI.start();
    this.procedimentoService.create(proc).subscribe(
      res => {
        this.blockUI.stop();
        this.msgService.success('Procedimento cadastrado.')
        this.buscarProcedimentos()
      }
    )
  }

  updateProcedimento(proc:Procedimento){
    this.blockUI.start();
    this.procedimentoService.update(proc).subscribe(
      res => {
        this.blockUI.stop();
        this.msgService.success('Procedimento atualizado.')
        this.buscarProcedimentos()
      }
    )
  }

  deleteProcedimento(procedimento:any){
    let dialogRef = this.dialog.open(ConfirmActionComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {text: 'Deseja excluir o procedimento ' + procedimento.nome + '?'}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res){
          this.blockUI.start()
          this.procedimentoService.delete(procedimento.id).subscribe(
            res => {
              this.msgService.success('Procedimento deletado.')
              this.blockUI.stop()
              this.buscarProcedimentos();
            }, error => {
              this.msgService.error('Erro ao deletar o procedimento.')
              this.blockUI.stop()
            }
          )
        }
      }
    )
  }

  openFicha(cliente){
    let dialogRef = this.dialog.open(FichaRegisterComponent,{
      width: '600px', height: 'auto', disableClose: false,
      data: { cliente: cliente, procedimentos: this.dataProcTable.data }
    });
    dialogRef.afterClosed().subscribe();
  }
}