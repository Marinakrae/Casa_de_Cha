package casa_de_cha.controller;

import casa_de_cha.model.Fornecedor;
import casa_de_cha.model.Fornecedor;
import casa_de_cha.repository.Fornecedor_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cha/fornecedor")
public class FornecedorController {

    @Autowired
    private final Fornecedor_Repository fornecedor_repository;

    public FornecedorController(Fornecedor_Repository fornecedor_repository) {
        this.fornecedor_repository = fornecedor_repository;
    }

    @GetMapping("/listar")
    public List<Fornecedor> getInfoJogadores() {
        return fornecedor_repository.findAll();
    }

    @GetMapping("/{id}")
    public Fornecedor getInfoJogador(int id) {
        return fornecedor_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(Fornecedor fornecedor) {
        fornecedor_repository.save(fornecedor);
    }

    @PutMapping("/apagar/{id}")
    public String apagar(@PathVariable("id") int id) {
        Fornecedor fornecedorEditado = fornecedor_repository.getReferenceById(id);
        fornecedorEditado.setAtivo(false);
        fornecedor_repository.save(fornecedorEditado);

        return "Fornecedor apagado com sucesso";
    }

    @PutMapping("/editar/{id}")
    public void editar( int id, Fornecedor fornecedor) {
        new Fornecedor();
        Fornecedor fornecedorEditado;
        fornecedorEditado = fornecedor_repository.getReferenceById(id);
        fornecedorEditado.setAtivo(fornecedor.getAtivo());
        fornecedorEditado.setCnpj(fornecedor.getCnpj());
        fornecedorEditado.setTelefone(fornecedor.getTelefone());
        fornecedorEditado.setRazao_social(fornecedor.getRazao_social());

        fornecedor_repository.save(fornecedorEditado);
    }
}
