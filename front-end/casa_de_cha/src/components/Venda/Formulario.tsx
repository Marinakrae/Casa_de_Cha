import Venda from "../../core/model/Venda"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"
import Produto from "../../core/model/Produto"
import Usuario from "../../core/model/Usuario"
import Tabela from "./Tabela"
import ItensVenda from "../../core/model/ItensVenda"
import TabelaItensVenda from "./TabelaItensVenda"

interface FormularioProps {
    venda: Venda
    vendaMudou?: (cliente: Venda) => void
    cancelado?: () => void
    produtos: Produto[]
    usuarios: Usuario[]
    itensVenda: ItensVenda[];
    qtdProduto?: number;
}

function filtrarProdutosAtivos(produtos: Produto[]) {
    return produtos.filter(produto => produto.ativo);
}

function filtrarVendedoresAtivos(usuarios: Usuario[]) {
    return usuarios.filter(usuario => usuario.ativo);
}

export default function Formulario(props: FormularioProps) {
    const id = props.venda?.id
    const [qtdProduto, setqtdProduto] = useState(props.qtdProduto ?? 0)
    const [vendedor, setVendedor] = useState(props.venda?.vendedor ?? '')
    const [valor_total, setValorTotal] = useState(props.venda?.valor_total ?? 0)
    const [data_venda, setDataVenda] = useState(props.venda?.dt_venda ?? '')
    const [id_itens_venda, setIdItensVenda] = useState(props.venda?.id_itens_venda ?? 0)
    const produtos = filtrarProdutosAtivos(props.produtos)
    const vendedores = filtrarVendedoresAtivos(props.usuarios)
    const [itens_venda, setItensVenda] = useState([] as ItensVenda[]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(''); // Estado para armazenar o produto selecionado
    const [quantidade, setQuantidade] = useState(0); // Estado para armazenar a quantidade

    function adicionarItemVenda() {
        const produto = produtos.find((p) => p.id === produtoSelecionado);

        if (produto) {
            // const itemVenda: ItensVenda = {
            //     _id: "",
            //     _qtd_vendida: quantidade,
            //     _id_produto: produto.id,
            //     _id_venda: id.toString,
            // };

            setItensVenda((prevItensVenda) => [
                ...prevItensVenda,
                ItensVenda.vazio(),
            ]);

            // Limpar os campos de entrada após adicionar o item de venda
            setProdutoSelecionado('');
            setQuantidade(0);
        }
    }

    return (
        <div>
            <Entrada
                texto="Vendedor"
                valor={vendedor}
                valorMudou={setVendedor}
                className="mb-5 pr-5"
                vendedores={vendedores}
            />
            <div className="flex flex-wrap">
                <Entrada
                    texto="Valor Total"
                    valor={valor_total}
                    valorMudou={setValorTotal}
                    className="mb-5"
                    metadeLargura
                />
                <Entrada
                    texto="Data de Registro"
                    valor={data_venda}
                    valorMudou={setDataVenda}
                    className="mb-5"
                    metadeLargura
                />
            </div>
            Itens Venda:
            <div className="flex flex-wrap">
                <Entrada
                    texto="Produto"
                    valor={produtoSelecionado}
                    valorMudou={setProdutoSelecionado}
                    className="mb-5 pr-5"
                    produtos={produtos}
                    metadeLargura
                />
                <Entrada
                    texto="Quantidade"
                    valor={qtdProduto}
                    valorMudou={setqtdProduto}
                    tipo="number"
                    className="mb-5 pr-5"
                    metadeLargura
                />
                <Botao cor="green" className="mr-2" onClick={adicionarItemVenda}>
                    Adicionar
                </Botao>
            </div>
            <br></br>
            <div className="flex flex-wrap">
                <TabelaItensVenda
                    itensVenda={props.itensVenda}
                    produtos={props.produtos}
                />
            </div>
            <div className="flex justify-end mt-4">
                <Botao cor='blue' className="mr-2"
                    onClick={() => props.vendaMudou?.(new Venda(id, valor_total, data_venda, id_itens_venda, vendedor))}
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}