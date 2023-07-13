import Produto from "../../core/model/Produto"
import Produto from "../../core/model/Produto"
import Venda from "../../core/model/Venda"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    vendas: Venda[]
    vendaSelecionado?: (venda: Venda) => void
    vendaExcluido?: (venda: Venda) => void
    produtos?: Produto[]
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.vendaExcluido || props.vendaSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Data Venda</th>
                <th className="text-left p-4">Valor Total</th>
                <th className="text-left p-4">Vendedor</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
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
            const nomeProduto = obterNomeProduto(venda.id_produto);
            return (
                <tr
                    key={venda.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'} ${!venda.ativo ? 'bg-gray-300' : ''}`}
                >
                    <td className="text-left p-4">{venda.nome}</td>
                    <td className="text-left p-4">{venda.descricao}</td>
                    <td className="text-left p-4">{nomeProduto}</td>
                    <td className="text-left p-4">{venda.custo}</td>
                    <td className="text-left p-4">{venda.valor_venda}</td>
                    <td className="text-left p-4">{venda.qtd_venda}</td>
                    <td className="text-left p-4">
                        <input type="checkbox" className="mx-auto" checked={venda.ativo} disabled />
                    </td>
                    {exibirAcoes ? renderizarAcoes(venda) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(venda: Venda) {
        return (
            <td className="flex justify-center">
                {props.vendaSelecionado ? (
                    <button onClick={() => props.vendaSelecionado?.(venda)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.vendaExcluido ? (
                    <button onClick={() => props.vendaExcluido?.(venda)} className={`
                    flex justify-center items-center
                    text-red-500 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeLixo}
                    </button>
                ) : false}
            </td>
        )
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