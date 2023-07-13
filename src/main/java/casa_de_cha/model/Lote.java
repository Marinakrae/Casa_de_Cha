package casa_de_cha.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "seq_lote", sequenceName = "seq_lote", allocationSize = 1)
public class Lote implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_lote")
    private int id_Lote;
    @Column
    private Date dt_validade;
    @Column
    private Date dt_registro;
    @Column
    private int qtd_lote;

    private int id_produto;

    public int getId_Lote() {
        return id_Lote;
    }

    public void setId_Lote(int id_Lote) {
        this.id_Lote = id_Lote;
    }

    public Date getDt_validade() {
        return dt_validade;
    }

    public void setDt_validade(Date dt_validade) {
        this.dt_validade = dt_validade;
    }

    public Date getDt_registro() {
        return dt_registro;
    }

    public void setDt_registro(Date dt_registro) {
        this.dt_registro = dt_registro;
    }

    public int getQtd_lote() {
        return qtd_lote;
    }

    public void setQtd_lote(int qtd_lote) {
        this.qtd_lote = qtd_lote;
    }

    public int getProduto() {
        return id_produto;
    }

    public void setProduto(int id_produto) {
        this.id_produto = id_produto;
    }

}
