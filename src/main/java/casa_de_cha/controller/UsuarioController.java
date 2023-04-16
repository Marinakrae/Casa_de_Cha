package casa_de_cha.controller;

import casa_de_cha.model.Usuario;
import casa_de_cha.repository.Usuario_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("cha/usuario")
public class UsuarioController {

    @Autowired
    private Usuario_Repository usuario_repository;

    public UsuarioController(Usuario_Repository usuario_repository) {
        this.usuario_repository = usuario_repository;
    }

    @GetMapping("/listar")
    public List<Usuario> getUsuario() {
        List<Usuario> Usuario = usuario_repository.findAll();
        for (Usuario usuario : Usuario) {
            usuario.setSenha("******");
        }

        return Usuario;
    }

    @GetMapping("/{id}")
    public Usuario getUsuario(@PathVariable("id") int id) {
        Usuario Usuario = usuario_repository.getReferenceById(id);
        Usuario.setSenha("******");
        return Usuario;
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Usuario Usuario) {
        new Usuario();
        Usuario usuarioCriptografado;
        usuarioCriptografado = Usuario;
        usuarioCriptografado.setSenha(new BCryptPasswordEncoder().encode(Usuario.getSenha()));
        usuario_repository.save(Usuario);
    }

    @PutMapping("/apagar/{id}")
    public ResponseEntity<Object> apagar(@PathVariable("id") int id) {
        Usuario usuario = usuario_repository.getReferenceById(id);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario não encontrado.");
        }
        usuario.setAtivo(false);
        usuario_repository.save(usuario);
        if (usuario.getAtivo()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível apagar o usuario.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Usuario apagado com sucesso.");
    }

    @PutMapping("/editar/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Usuario usuario) {
        Usuario usuarioEditado;
        usuarioEditado = usuario_repository.getReferenceById(id);
        usuarioEditado.setLogin(usuario.getLogin());
        usuarioEditado.setNome_usuario(usuario.getNome_usuario());
        usuarioEditado.setPermissao(usuario.getPermissao());
        usuarioEditado.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));

        usuario_repository.save(usuarioEditado);
    }



}
