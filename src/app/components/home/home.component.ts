import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { ClientService } from 'src/app/services/client.service';
import { DateParse } from 'src/app/utils/dateParse';
import { ClientRegisterComponent } from '../modal/client-register/client-register.component';
import { ConfirmActionComponent } from '../modal/confirm-action/confirm-action.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  dataTable = new MatTableDataSource<Client>();
  columns = ['options', 'name', 'cpf', 'data', 'email', 'phone', 'plano']

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.readAllClients();
  }

  readAllClients(){
    this.blockUI.start();
    this.clientService.readAllClients().subscribe(
      result => {
        console.log(result)
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
    console.log(client)
    this.clientService.createClient(client).subscribe(
      res => this.readAllClients()
    )
  }

  updateClient(client:Client){
    console.log(client)
    this.clientService.createClient(client).subscribe(
      res => this.readAllClients()
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
              this.msgService.success('Usuário deletado.')
              this.blockUI.stop()
              this.readAllClients();
            }, error => {
              this.msgService.error('Erro ao deletar usuário.')
              this.blockUI.stop()
            }
          )
        }
      }
    )
  }

  parseDate(dateStr){
    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    let validDate = date + 'T' + time + '.' + millisecond;
    console.log(validDate)
    return validDate
  }
}