package casa_de_cha.controller;

import casa_de_cha.model.Categoria;
import casa_de_cha.repository.Categoria_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public String apagar(@PathVariable("id") int id) {
        Categoria categoriaEditado = categoria_repository.getReferenceById(id);
        categoriaEditado.setAtivo(false);
        categoria_repository.save(categoriaEditado);

        return "Categoria apagada com sucesso";
    }

    @PutMapping("/editar/{id}")
    public Categoria editar(@PathVariable("id") int id, @RequestBody Categoria categoria) {
        Categoria categoriaEditado = categoria_repository.getReferenceById(id);
        categoriaEditado.setNome_cat(categoria.getNome_cat());
        categoriaEditado.setAtivo(categoria.isAtivo());

        return categoria_repository.save(categoriaEditado);
    }
}
