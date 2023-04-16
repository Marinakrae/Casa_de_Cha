package casa_de_cha.controller;

import casa_de_cha.model.Produto;
import casa_de_cha.repository.Produto_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("cha/produto")
public class ProdutoController {

    @Autowired
    private Produto_Repository produto_repository;

    public ProdutoController(Produto_Repository produto_repository) {
        this.produto_repository = produto_repository;
    }

    @GetMapping("/listar")
    public List<Produto> getProdutos() {
        return produto_repository.findAll();
    }

    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable("id") int id) {
        return produto_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Produto niveis) {
        produto_repository.save(niveis);
    }

    @PutMapping("/apagar/{id}")
    public ResponseEntity<Object> apagar(@PathVariable("id") int id) {
        Produto produto = produto_repository.getReferenceById(id);
        if (produto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Produto não encontrado.");
        }
        produto.setAtivo(false);
        produto_repository.save(produto);
        if (produto.getAtivo()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível apagar o produto.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Produto apagado com sucesso.");
    }

    @PutMapping("/editar/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Produto produto) {
        new Produto();
        Produto produtoEditado;
        produtoEditado = produto_repository.getReferenceById(id);
        produtoEditado.setNome_produto(produto.getNome_produto());
        produtoEditado.setQtd_produto(produto.getQtd_produto());
        produtoEditado.setDescricao(produto.getDescricao());
        produtoEditado.setCusto(produto.getCusto());
        produtoEditado.setCategoria(produto.getCategoria());
        produtoEditado.setAtivo(produto.getAtivo());
        produtoEditado.setFornecedor(produto.getFornecedor());

        produto_repository.save(produtoEditado);
    }
}

