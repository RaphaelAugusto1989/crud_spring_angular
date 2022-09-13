package com.pedido.restapi.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedido.restapi.entidade.Pedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RepositoryPedido extends JpaRepository<Pedido, Long> {

    Optional<Pedido> findByCpf(String cpf);
}
