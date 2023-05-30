import Usuario from "../../core/model/Usuario"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"

interface FormularioProps {
    usuario: Usuario
    usuarioMudou?: (cliente: Usuario) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.usuario?.id
    const [nome, setNome] = useState(props.usuario?.nome ?? '')
    const [login, setLogin] = useState(props.usuario?.login ?? 0)
    const [senha, setSenha] = useState(props.usuario?.senha ?? 0)
    const [permissao, setPermissao] = useState(props.usuario?.permissao ?? 0)
    const [ativo, setAtivo] = useState(props.usuario?.ativo ?? 0)
    return (
        <div>
            <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-5 pr-5"
            />
            <div className="flex flex-wrap">
                <Entrada
                    texto="Email"
                    valor={login}
                    valorMudou={setLogin}
                    className="mb-5 pr-5"
                    metadeLargura
                />
                <Entrada
                    texto="Permissão"
                    valor={permissao}
                    valorMudou={setPermissao}
                    className="mb-5"
                    metadeLargura
                />
            </div>
            <div className="flex flex-wrap">
                <Entrada
                    texto="Senha"
                    valor={senha}
                    valorMudou={setSenha}
                    className="mb-5 pr-5"
                    metadeLargura
                />
                <Entrada
                    texto="Confirme a senha"
                    valor={senha}
                    valorMudou={setSenha}
                    className="mb-5"
                    metadeLargura
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={ativo}
                        onChange={(e) => setAtivo(e.target.checked)}
                        className="mr-2 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label>Ativo</label>
                </div>
            </div>

            <div className="flex justify-end mt-7">
                <Botao cor='blue' className="mr-2"
                    onClick={() => props.usuarioMudou?.(new Usuario(id, nome, login, senha, permissao, ativo))}
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