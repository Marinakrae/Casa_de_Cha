package casa_de_cha.controller;

import casa_de_cha.model.Lote;
import casa_de_cha.repository.Lote_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("cha/lote")
public class LoteController {

    @Autowired
    private Lote_Repository lote_repository;

    public LoteController(Lote_Repository lote_repository) {
        this.lote_repository = lote_repository;
    }

    @GetMapping("/listar")
    public List<Lote> getLotes() {
        return lote_repository.findAll();
    }

    @GetMapping("/{id}")
    public Lote getLotesById(@PathVariable("id") int id) {
        return lote_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Lote lote) {
        lote_repository.save(lote);
    }

    @PutMapping("/editar/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Lote lote) {
        new Lote();
        Lote loteEditado;
        loteEditado = lote_repository.getReferenceById(id);
        loteEditado.setQtd_lote(lote.getQtd_lote());
        loteEditado.setDt_registro(lote.getDt_registro());
        loteEditado.setDt_validade(lote.getDt_validade());
        loteEditado.setProduto(lote.getProduto());

        lote_repository.save(loteEditado);
    }
}

