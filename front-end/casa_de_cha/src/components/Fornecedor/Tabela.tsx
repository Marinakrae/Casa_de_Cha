import Fornecedor from "../../core/Fornecedor"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    fornecedores: Fornecedor[]
    fornecedorSelecionado?: (fornecedor: Fornecedor) => void
    fornecedorExcluido?: (fornecedor: Fornecedor) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.fornecedorExcluido || props.fornecedorSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Razão Social</th>
                <th className="text-left p-4">Cnpj</th>
                <th className="text-left p-4">Telefone</th>
                <th className="text-left p-4">Ativo</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.fornecedores?.map((fornecedor, i) => {
            console.log(fornecedor)
            return (
                <tr
                    key={fornecedor.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'} ${!fornecedor.ativo ? 'bg-gray-300' : ''}`}
                >
                    <td className="text-left p-4">{fornecedor.razao_social}</td>
                    <td className="text-left p-4">{fornecedor.cnpj}</td>
                    <td className="text-left p-4">{fornecedor.telefone}</td>
                    <td className="text-left p-4">
                        <input type="checkbox" className="mx-auto" checked={fornecedor.ativo} disabled />
                    </td>
                    {exibirAcoes ? renderizarAcoes(fornecedor) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(fornecedor: Fornecedor) {
        return (
            <td className="flex justify-center">
                {props.fornecedorSelecionado ? (
                    <button onClick={() => props.fornecedorSelecionado?.(fornecedor)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.fornecedorExcluido ? (
                    <button onClick={() => props.fornecedorExcluido?.(fornecedor)} className={`
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