import Fornecedor from "../../core/Fornecedor"
import Produto from "../../core/Produto"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    produtos: Produto[]
    produtoSelecionado?: (produto: Produto) => void
    produtoExcluido?: (produto: Produto) => void
    fornecedores?: Fornecedor[]
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.produtoExcluido || props.produtoSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Descrição</th>
                <th className="text-left p-4">Fornecedor</th>
                <th className="text-left p-4">Custo</th>
                <th className="text-left p-4">Vl. Venda</th>
                <th className="text-left p-4">Qtde</th>
                <th className="text-left p-4">Ativo</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function obterNomeFornecedor(idFornecedor: string) {
        const fornecedores = props.fornecedores || [];

        const fornecedorEncontrado = fornecedores.find(
            (fornecedor) => fornecedor.id === idFornecedor
        );
        return fornecedorEncontrado?.razao_social || "";
    }

    function renderizarDados() {

        return props.produtos?.map((produto, i) => {
            const nomeFornecedor = obterNomeFornecedor(produto.id_fornecedor);
            return (
                <tr
                    key={produto.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'} ${!produto.ativo ? 'bg-gray-300' : ''}`}
                >
                    <td className="text-left p-4">{produto.nome}</td>
                    <td className="text-left p-4">{produto.descricao}</td>
                    <td className="text-left p-4">{nomeFornecedor}</td>
                    <td className="text-left p-4">{produto.custo}</td>
                    <td className="text-left p-4">{produto.valor_venda}</td>
                    <td className="text-left p-4">{produto.qtd_produto}</td>
                    <td className="text-left p-4">
                        <input type="checkbox" className="mx-auto" checked={produto.ativo} disabled />
                    </td>
                    {exibirAcoes ? renderizarAcoes(produto) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(produto: Produto) {
        return (
            <td className="flex justify-center">
                {props.produtoSelecionado ? (
                    <button onClick={() => props.produtoSelecionado?.(produto)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.produtoExcluido ? (
                    <button onClick={() => props.produtoExcluido?.(produto)} className={`
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