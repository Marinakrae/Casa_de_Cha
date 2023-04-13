package casa_de_cha.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@SequenceGenerator(name = "seq_usuario", sequenceName = "seq_usuario", allocationSize = 1)
public class Usuario implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuario")
    private int id_usuario;
    @Column
    private String nome_usuario;
    @Column
    private String login;
    @Column
    private String senha;
    @Column
    private String permissao;
    @Column
    private Boolean ativo;
    @Column
    private String token;

    public int getId_Usuario() {
        return id_usuario;
    }

    public void setId_Usuario(int id_Usuario) {
        this.id_usuario = id_Usuario;
    }

    public String getNome_usuario() {
        return nome_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getPermissao() {
        return permissao;
    }

    public void setPermissao(String permissao) {
        this.permissao = permissao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Usuario(int id_usuario, String nome_usuario, String login, String senha, String permissao, Boolean ativo) {
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
        this.login = login;
        this.senha = senha;
        this.permissao = permissao;
        this.ativo = ativo;
    }
}
