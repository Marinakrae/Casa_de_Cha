import Categoria from "../../core/Categoria"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"

interface FormularioProps {
    categoria: Categoria
    categoriaMudou?: (cliente: Categoria) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.categoria?.id
    const [nome, setNome] = useState(props.categoria?.nome ?? '')
    const [ativo, setAtivo] = useState(props.categoria?.ativo ?? 0)
    return (
        <div>
            <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-5"
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
            <div className="flex justify-end mt-7">
                <Botao cor='blue' className="mr-2"
                    onClick={() => props.categoriaMudou?.(new Categoria(nome, ativo, id))}
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