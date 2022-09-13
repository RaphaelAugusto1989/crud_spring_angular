import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ListaPedidosInterface } from "./lista-pedidos.interface";
import { BehaviorSubject } from "rxjs";
import { PedidosService } from "../services/pedidos.service";
import { Router } from "@angular/router";
import { MatDialog}  from "@angular/material/dialog";
import { CadastraPedidosComponent } from "../cadastra-pedidos/cadastra-pedidos.component";


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  id: string;

  displayColumns: string[] = ["nome", "cpf", "descricao", "quantidade", "itens", "acao"];

  pedidosDataSource:  MatTableDataSource<ListaPedidosInterface>;

  private loadingDataSource = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private pedidosService: PedidosService,
  ) { }


  ngOnInit(): void {
    this.carregaTabelaPedidos();
  }

  private carregaTabelaPedidos(): void {
    this.loadingDataSource.next(true);

    this.pedidosService.carregaPedidos()
      .subscribe(
        (res: any) => {
          this.pedidosDataSource = new MatTableDataSource(res)
        }
      )
  }

  public alterarPedido(id: string) {
    this.id = id;
    this.openDialog();

  }

  public exluirPedido(id: string) {
   this.pedidosService.deletaPedido(id).subscribe(() => {
     this.pedidosService.showMessager("Pedido Excluído com Sucesso!");
     location.reload();
   },
     error => {
     this.pedidosService.showMessager("Erro ao excluir pedido!")
     }
   );
  }

  openDialog(): void {
    const dialogOpen = this.dialog.open(CadastraPedidosComponent, {
      width: '450px',
      // id: this.id,
      data: this.id
    });
  }
}
