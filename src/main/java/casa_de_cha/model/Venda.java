package casa_de_cha.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@SequenceGenerator(name = "seq_Venda", sequenceName = "seq_Venda", allocationSize = 1)
public class Venda implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_Venda")
    private int id_venda;
    @Column
    private Date dt_venda;
    @Column
    private Float valor_total;
    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id_usuario")
    private Usuario usuario;

    public int getId_Venda() {
        return id_venda;
    }

    public void setId_Venda(int id_Venda) {
        this.id_venda = id_Venda;
    }

    public Date getDt_venda() {
        return dt_venda;
    }

    public void setDt_venda(Date dt_venda) {
        this.dt_venda = dt_venda;
    }

    public Float getValor_total() {
        return valor_total;
    }

    public void setValor_total(Float valor_total) {
        this.valor_total = valor_total;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}
