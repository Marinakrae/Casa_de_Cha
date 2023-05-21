import Categoria from "../core/Categoria"
import Botao from "./Botao"
import Entrada from "./Entrada"
import { useState } from "react"

interface FormularioProps {
    categoria: Categoria
    categoriaMudou?: (cliente: Categoria) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    //const id = props.categoria?.id
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
            <div className="flex items-center mb-5">
                <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="mr-2"
                />
                <label>Ativo</label>
            </div>
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.clienteMudou?.(new Categoria(nome, ativo))}
                >
                    {/* {id ? 'Alterar' : 'Salvar'} */}
                </Botao>
                <Botao className="mr-2" onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}