import Lote from "../../core/model/Lote"
import Produto from "../../core/model/Produto"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    lotes: Lote[]
    loteSelecionado?: (lote: Lote) => void
    loteExcluido?: (lote: Lote) => void
    produtos?: Produto[]
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.loteExcluido || props.loteSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Produto</th>
                <th className="text-left p-4">Data Validade</th>
                <th className="text-left p-4">Data Registro</th>
                <th className="text-left p-4">Qtde</th>
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

        return props.lotes?.map((lote, i) => {
            const nomeProduto = obterNomeProduto(lote.id_produto);
            return (
                <tr
                    key={lote.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'}`}
                >
                    <td className="text-left p-4">{nomeProduto}</td>
                    <td className="text-left p-4">{lote.dt_validade}</td>
                    <td className="text-left p-4">{String(lote.dt_registro)}</td>
                    <td className="text-left p-4">{lote.qtd_lote}</td>
                    {exibirAcoes ? renderizarAcoes(lote) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(lote: Lote) {
        return (
            <td className="flex justify-center">
                {props.loteSelecionado ? (
                    <button onClick={() => props.loteSelecionado?.(lote)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
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