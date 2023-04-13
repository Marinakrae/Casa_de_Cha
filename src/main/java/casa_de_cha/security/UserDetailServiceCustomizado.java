package casa_de_cha.security;

import casa_de_cha.model.Usuario;
import casa_de_cha.repository.Usuario_Repository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Service
public class UserDetailServiceCustomizado implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = Usuario_Repository.getUsuarioByUser(username);

        if(usuario==null){
            throw new UsernameNotFoundException("Usuário ou senha incorretos");
        } else{
            return User.withUsername(usuario.getLogin())
                    .password(usuario.getSenha())
                    .authorities(usuario.getPermissao()).build();
        }
    }
}
