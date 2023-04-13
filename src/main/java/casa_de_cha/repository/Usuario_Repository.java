package casa_de_cha.repository;

import casa_de_cha.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public interface Usuario_Repository extends JpaRepository<Usuario, Integer>{

    static Usuario getUsuarioByUser(String user) {
        if (user.equals("marina@teste")) {
            return new Usuario(1, "Marina", user, new BCryptPasswordEncoder().encode("123"), "ADMIN", true);

        } else if (user.equals("claudia@teste")) {
            return new Usuario(2, "Claudia", user, new BCryptPasswordEncoder().encode("1234"), "USER", true);
        } else {
            return null;
        }
    }

}


