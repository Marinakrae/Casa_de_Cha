package casa_de_cha.controller;

import casa_de_cha.model.Fornecedor;
import casa_de_cha.model.Fornecedor;
import casa_de_cha.repository.Fornecedor_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> apagar(@PathVariable("id") int id) {
        Fornecedor fornecedor = fornecedor_repository.getReferenceById(id);
        if (fornecedor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fornecedor não encontrado.");
        }
        fornecedor.setAtivo(false);
        fornecedor_repository.save(fornecedor);
        if (fornecedor.getAtivo()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível apagar o fornecedor.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Fornecedor apagado com sucesso.");
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
