package casa_de_cha.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@SequenceGenerator(name = "seq_categoria", sequenceName = "seq_categoria", allocationSize = 1)
public class Categoria implements Serializable{

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_categoria")
    private int id_categoria;
    @Column
    private String nome_cat;

    @Column
    private boolean ativo;

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public int getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNome_cat() {
        return nome_cat;
    }

    public void setNome_cat(String nome) {
        this.nome_cat = nome;
    }

}
