import Usuario from "../../core/model/Usuario"
import { IconeEdicao, IconeLixo } from "../Icones"

interface TabelaProps {
    usuarios: Usuario[]
    usuarioSelecionado?: (usuario: Usuario) => void
    usuarioExcluido?: (usuario: Usuario) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.usuarioExcluido || props.usuarioSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Permissão</th>
                <th className="text-left p-4">Ativo</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function obterNomePermissao(idPermissao: string) {
        const usuarios = props.usuarios || [];

        console.log(idPermissao)

        const permissaoEncontrada = usuarios.find(
            (usuario) => usuario.permissao === idPermissao
        );

        if (permissaoEncontrada?.permissao === '1') {
            return 'Administrador';
        } else if (permissaoEncontrada?.permissao === '2') {
            return 'Usuário';
        } else {
            return '';
        }

    }

    function renderizarDados() {
        return props.usuarios?.map((usuario, i) => {
            const nomePermissao = obterNomePermissao(usuario.permissao);

            return (
                <tr
                    key={usuario.id}
                    className={`${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-100'} ${!usuario.ativo ? 'bg-gray-300' : ''}`}
                >
                    <td className="text-left p-4">{usuario.nome}</td>
                    <td className="text-left p-4">{usuario.login}</td>
                    <td className="text-left p-4">{nomePermissao}</td>
                    <td className="text-left p-4">
                        <input type="checkbox" className="mx-auto" checked={usuario.ativo} disabled />
                    </td>
                    {exibirAcoes ? renderizarAcoes(usuario) : false}
                </tr>
            );
        });
    }

    function renderizarAcoes(usuario: Usuario) {
        return (
            <td className="flex justify-center">
                {props.usuarioSelecionado ? (
                    <button onClick={() => props.usuarioSelecionado?.(usuario)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.usuarioExcluido ? (
                    <button onClick={() => props.usuarioExcluido?.(usuario)} className={`
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