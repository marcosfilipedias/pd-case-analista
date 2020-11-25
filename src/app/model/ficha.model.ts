import { Client } from './client.model';

export class Ficha{
	id: number;
	cliente: Client;
	dataCriacao: Date;
	procedimentosRealizados:any[];
}