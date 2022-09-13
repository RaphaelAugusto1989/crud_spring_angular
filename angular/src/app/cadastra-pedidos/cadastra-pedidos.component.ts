import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PedidosService } from "../services/pedidos.service";
import { ListaPedidosInterface } from "../lista-pedidos/lista-pedidos.interface";
import { Router } from "@angular/router";
import {delay, Observable} from "rxjs";
import { CadastraPedidoInterface } from "./cadastra-pedido.interface";

@Component({
  selector: 'app-cadastra-pedidos',
  templateUrl: './cadastra-pedidos.component.html',
  styleUrls: ['./cadastra-pedidos.component.scss']
})
export class CadastraPedidosComponent implements OnInit {

  title: String;

  form: FormGroup;

  dataHoje = new Intl.DateTimeFormat("pt-BR").format(new Date());

  pedido: ListaPedidosInterface;

  cpfCadastrado: string;

  dataCadastrada: string;

  constructor(
    public dialogRef: MatDialogRef<CadastraPedidosComponent>,
    private pedidosService: PedidosService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public id: string
  ) {
    dialogRef.disableClose = true;
    this.form = this.formBuilder.group( {
      id: [null],
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      descricao: [null, Validators.required],
      quantidade: [null, Validators.required],
      itens: [null, Validators.required],
      data: [this.dataHoje]
    });
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.mostraDadosPedido();
      this.title = "Alterar Pedido";
    } else {
      this.title = "Novo Pedido";
    }
  }

  public validaNovoPedido(){
    if(this.form.get('cpf').value == this.cpfCadastrado && this.dataHoje == this.dataCadastrada) {
      this.pedidosService.showMessager("Pedido já realizado neste cpf na data de hoje!");
    } else {
      this.salvarPedido();
    }
  }

  public salvarPedido(): void {
    this.pedidosService.salvaPedido(this.form.value).subscribe(
      () => {
        if(this.form.value.id == null) {
          this.pedidosService.showMessager("Pedido realizado com sucesso!");
        } else {
          this.pedidosService.showMessager("Pedido alterado com sucesso!");
        }
        this.closeDialog();
        location.reload();
      },
      error => {
        this.pedidosService.showMessager("Erro ao realizar Pedido!");
      }
    )
  }

  public mostraDadosPedido(): any {
    this.pedidosService.carregaDadosPedido(this.id)
      .subscribe(res => {
      return this.form.patchValue({
        id: res.id,
        nome: res.nome,
        cpf: res.cpf,
        descricao: res.descricao,
        quantidade: res.quantidade,
        itens: res.itens,
        data: res.data
      })
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.form.reset();
    location.reload();
  }


}
