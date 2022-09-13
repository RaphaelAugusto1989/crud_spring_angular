package com.pedido.restapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pedido.restapi.database.RepositoryPedido;
import com.pedido.restapi.entidade.Pedido;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/pedidos")
public class PedidoREST {

    public List<Pedido> dadosPedidos;

    @Autowired
    private RepositoryPedido repositorio;

    @GetMapping
    public List<Pedido> listar() {
        this.dadosPedidos = repositorio.findAll();
        return dadosPedidos;
    }

    @GetMapping(path = "/alterar/{id}")
    public Optional<Pedido> buscaPedidoPor(@PathVariable("id") Long id) {
        return repositorio.findById(id);
    }

    @PostMapping
    public boolean salvar(@RequestBody Pedido pedido) {
        this.dadosPedidos = this.listar();
        for(int i = 0; this.dadosPedidos.size() < i; i++ ){
            if(this.dadosPedidos.get(i).getCpf() == pedido.getCpf() && this.dadosPedidos.get(i).getData() == pedido.getData()) {
                return true;
            } else {
                repositorio.save(pedido);
            }
        }
       return false;
    }
    
    @PutMapping
    public void alterar(@RequestBody Pedido pedido) {
        if (pedido.getId() > 0) {
            repositorio.save(pedido);
        }
    }

    @DeleteMapping( path = "/excluir/{id}")
    public void excluir(@PathVariable("id") Long id) {
        repositorio.deleteById(id);
    }

}
