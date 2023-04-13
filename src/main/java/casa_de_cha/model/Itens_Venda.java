package casa_de_cha.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@SequenceGenerator(name = "seq_Itens_Venda", sequenceName = "seq_Itens_Venda", allocationSize = 1)
public class Itens_Venda implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_Itens_Venda")
    private int id_itens_venda;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "id_venda")
    private Venda venda;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "produto_id_produto")
    private Produto produto;

    private int qtd_vendida;

    public int getId_itens_venda() {
        return id_itens_venda;
    }

    public void setId_itens_venda(int id_itens_venda) {
        this.id_itens_venda = id_itens_venda;
    }

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQtd_vendida() {
        return qtd_vendida;
    }

    public void setQtd_vendida(int qtd_vendida) {
        this.qtd_vendida = qtd_vendida;
    }

}
