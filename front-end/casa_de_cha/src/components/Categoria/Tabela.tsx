import Categoria from "../../core/Categoria"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    categorias: Categoria[]
    categoriaSelecionado?: (categoria: Categoria) => void
    categoriaExcluido?: (categoria: Categoria) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.categoriaExcluido || props.categoriaSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Ativo</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.categorias?.map((categoria, i) => {
            console.log(categoria)
            return (
                <tr
                    key={categoria.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'} ${!categoria.ativo ? 'bg-gray-200' : ''}`}
                >
                    <td className="text-left p-4">{categoria.nome}</td>
                    <td className="text-left p-4">
                        <input type="checkbox" className="mx-auto" checked={categoria.ativo} disabled />
                    </td>
                    {exibirAcoes ? renderizarAcoes(categoria) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(categoria: Categoria) {
        return (
            <td className="flex justify-center">
                {props.categoriaSelecionado ? (
                    <button onClick={() => props.categoriaSelecionado?.(categoria)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.categoriaExcluido ? (
                    <button onClick={() => props.categoriaExcluido?.(categoria)} className={`
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