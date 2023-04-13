package casa_de_cha.controller;

import casa_de_cha.model.Itens_Venda;
import casa_de_cha.repository.Itens_Venda_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cha/itens_venda")
public class Itens_VendaController {

    @Autowired
    private final Itens_Venda_Repository itens_venda_repository;

    public Itens_VendaController(Itens_Venda_Repository itens_venda_repository) {
        this.itens_venda_repository = itens_venda_repository;
    }

    @GetMapping("/listar")
    public List<Itens_Venda> getItens_Vendas() {
        return itens_venda_repository.findAll();
    }

    @GetMapping("/{id}")
    public Itens_Venda getItens_Venda(int id) {
        return itens_venda_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(Itens_Venda Itens_Venda) {
        itens_venda_repository.save(Itens_Venda);
    }

    @PutMapping("/editar/{id}")
    public void editar(int id, Itens_Venda execucaoItens_Venda) {
        new Itens_Venda();
        Itens_Venda execucaoItens_VendaEditado;
        execucaoItens_VendaEditado = itens_venda_repository.getReferenceById(id);
        execucaoItens_VendaEditado.setVenda(execucaoItens_Venda.getVenda());
        execucaoItens_VendaEditado.setProduto(execucaoItens_Venda.getProduto());
        execucaoItens_VendaEditado.setQtd_vendida(execucaoItens_Venda.getQtd_vendida());

        itens_venda_repository.save(execucaoItens_VendaEditado);
    }
}
