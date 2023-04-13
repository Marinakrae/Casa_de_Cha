package casa_de_cha.controller;

import casa_de_cha.model.Categoria;
import casa_de_cha.repository.Categoria_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cha/categoria")
public class CategoriaController {

    @Autowired
    private Categoria_Repository categoria_repository;

    public CategoriaController(Categoria_Repository categoria_repository) {
        this.categoria_repository = categoria_repository;
    }

    @GetMapping("/listar")
    public List<Categoria> getCategoria() {
        return categoria_repository.findAll();
    }

    @GetMapping("/{id}")
    public Categoria getCategoriaById(@PathVariable("id") int id) {
        return categoria_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Categoria categoria) {
        categoria_repository.save(categoria);
    }

    @PutMapping("/apagar/{id}")
    public ResponseEntity<Object> apagar(@PathVariable("id") int id) {
        Categoria categoria = categoria_repository.getReferenceById(id);
        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Categoria não encontrada.");
        }
        categoria.setAtivo(false);
        categoria_repository.save(categoria);
        if (categoria.isAtivo()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível apagar a categoria.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Categoria apagada com sucesso.");
    }



    @PutMapping("/editar/{id}")
    public Categoria editar(@PathVariable("id") int id, @RequestBody Categoria categoria) {
        Categoria categoriaEditado = categoria_repository.getReferenceById(id);
        categoriaEditado.setNome_cat(categoria.getNome_cat());
        categoriaEditado.setAtivo(categoria.isAtivo());

        return categoria_repository.save(categoriaEditado);
    }
}
