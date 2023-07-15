import ItensVenda from "../../core/model/ItensVenda"
import Produto from "../../core/model/Produto"
import Venda from "../../core/model/Venda"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    produtos?: Produto[]
    itensVenda: ItensVenda[];
}

export default function TabelaItensVenda(props: TabelaProps) {

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Produtos</th>
                <th className="text-left p-4">Quantidade</th>
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

        return props.itensVenda?.map((item, i) => {
            return (
                <tr
                    key={item.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'}`}
                >
                    <td className="text-left p-4">{obterNomeProduto(item.id_produto)}</td>
                    <td className="text-left p-4">{item.qtd_vendida}</td>
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