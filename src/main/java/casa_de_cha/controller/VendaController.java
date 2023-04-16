package casa_de_cha.controller;

import casa_de_cha.model.Venda;
import casa_de_cha.repository.Venda_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("cha/venda")
public class VendaController {

    @Autowired
    private Venda_Repository venda_repository;

    public VendaController(Venda_Repository venda_repository) {
        this.venda_repository = venda_repository;
    }

    @GetMapping("/listar")
    public List<Venda> getComplementos() {
        return venda_repository.findAll();
    }

    @GetMapping("/{id}")
    public Venda getComplementosById(@PathVariable("id") int id) {
        return venda_repository.getReferenceById(id);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Venda niveis) {
        venda_repository.save(niveis);
    }

    @PutMapping("/editar/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Venda venda) {
        new Venda();
        Venda vendaEditado;
        vendaEditado = venda_repository.getReferenceById(id);
        vendaEditado.setDt_venda(venda.getDt_venda());
        vendaEditado.setUsuario(venda.getUsuario());
        vendaEditado.setValor_total(venda.getValor_total());

        venda_repository.save(vendaEditado);
    }
}

