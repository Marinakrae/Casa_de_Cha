import ItensVenda from "../../core/model/ItensVenda"
import Produto from "../../core/model/Produto"
import Venda from "../../core/model/Venda"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    vendas: Venda[]
    vendaSelecionado?: (venda: Venda) => void
    vendaExcluido?: (venda: Venda) => void
    produtos?: Produto[]
    itensVenda: ItensVenda[];
}

export default function Tabela(props: TabelaProps) {

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Valor Total</th>
                <th className="text-left p-4">Data Venda</th>
                <th className="text-left p-4">Vendedor</th>
            </tr>
        )
    }

    function obterNomeProduto(idProduto: string) {
        const produtos = props.produtos || [];

        const produtoEncontrado = produtos.find(
            (produto) => produto.id === idProduto
        );
        return produtoEncontrado?.nome || "";
    }

    function renderizarDados() {

        return props.vendas?.map((venda, i) => {
            return (
                <tr
                    key={venda.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'}`}
                >
                    <td className="text-left p-4">{venda.valor_total}</td>
                    <td className="text-left p-4">{venda.dt_venda}</td>
                    <td className="text-left p-4">{venda.vendedor}</td>
                </tr>
            );
        });
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                bg-pink-300
                    text-amber-950
            `}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}