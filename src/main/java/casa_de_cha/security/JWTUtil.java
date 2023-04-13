package casa_de_cha.security;

import casa_de_cha.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {

    public static  final long TEMPO_VIDA = Duration.ofSeconds(600).toMillis();

    public String geraToken(Usuario usuario) {

        final Map<String, Object> claims = new HashMap<>();
        claims.put("sub", usuario.getLogin());
        claims.put("permissoes: ", usuario.getPermissao());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis()+ TEMPO_VIDA))
                .signWith(SignatureAlgorithm.HS256, "poow2") //chave de segurança para descriptografar o token
                .compact();
    }

    public String getUsernameToken(String token){
        if(token != null){
            System.out.println("Token do getUsernametoken: "+this.parseToken(token).getSubject());
            return this.parseToken(token).getSubject();
        } else {
            return null;
        }
    }

    public boolean isTokenExpirado(String token){
        //testa se a data de expiracao é maior do que a data atual
        if(token != null) {
            return this.parseToken(token).getExpiration().before(new Date());
        } else {
            return false;
        }
    }

    private Claims parseToken(String token){
        return Jwts.parser()
                .setSigningKey("poow2")
                .parseClaimsJws(token.replace("Bearer", ""))
                .getBody();
    }
}
