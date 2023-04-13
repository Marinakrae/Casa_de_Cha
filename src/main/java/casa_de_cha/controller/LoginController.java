package casa_de_cha.controller;

import casa_de_cha.model.Usuario;
import casa_de_cha.repository.Usuario_Repository;
import casa_de_cha.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private Usuario_Repository usuario_repository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @CrossOrigin
    @PostMapping("/cha/login")
    public ResponseEntity<Object> autenticacao(@RequestBody Usuario usuario){
        System.out.println(usuario.getNome_usuario());
        System.out.println(usuario.getId_Usuario());
        System.out.println(usuario.getPermissao());
        System.out.println(usuario.getToken());
        System.out.println(usuario.getAtivo());
        System.out.println("User: "+usuario.getLogin());
        System.out.println("Senha: "+usuario.getSenha());

        try {
            final Authentication autenticado = this.authenticationManager.authenticate
                                        (new UsernamePasswordAuthenticationToken(usuario.getLogin(),usuario.getSenha()));
            if(autenticado.isAuthenticated()){
                //colocamos nossa instancia de autenticado no contexto do spring security
                SecurityContextHolder.getContext().setAuthentication(autenticado);

                System.out.println("Gerando token de autorizacao ****");
                String token = new JWTUtil().geraToken(usuario);
                usuario.setToken(token);

                usuario.setSenha("******");
                return new ResponseEntity<>(usuario, HttpStatus.OK);
            }

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Usuário ou senha incorretos!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Usuário ou senha incorretos!", HttpStatus.BAD_REQUEST);
    }

}
