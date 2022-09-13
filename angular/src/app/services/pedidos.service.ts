import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListaPedidosInterface } from "../lista-pedidos/lista-pedidos.interface";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private readonly API_URL = 'http://localhost:8080/pedidos';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public carregaPedidos():Observable<ListaPedidosInterface> {
    return this.http.get<ListaPedidosInterface>(
      `${this.API_URL}`,
    );
  }

  public salvaPedido(pedido: ListaPedidosInterface){
    return this.http.post<ListaPedidosInterface>(
      `${this.API_URL}`,
      pedido
    )
  }

  public carregaDadosPedido(id: string): Observable<ListaPedidosInterface>  {
    return this.http.get<ListaPedidosInterface>(
      `${this.API_URL}/alterar/${id}`
    )
  }

  public deletaPedido(id: string): Observable<ListaPedidosInterface> {
    return this.http.delete<ListaPedidosInterface>(
      `${this.API_URL}/excluir/${id}`
    )
  }

  public showMessager(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }
}
