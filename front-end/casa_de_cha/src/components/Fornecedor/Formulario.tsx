import Fornecedor from "../../core/model/Fornecedor"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"

interface FormularioProps {
    fornecedor: Fornecedor
    fornecedorMudou?: (cliente: Fornecedor) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.fornecedor?.id
    const [razao_social, setRazaoSocial] = useState(props.fornecedor?.razao_social ?? '')
    const [cnpj, setCnpj] = useState(props.fornecedor?.cnpj ?? 0)
    const [telefone, setTelefone] = useState(props.fornecedor?.telefone ?? 0)
    const [ativo, setAtivo] = useState(props.fornecedor?.ativo ?? 0)
    return (
        <div>
            <Entrada
                texto="Nome"
                valor={razao_social}
                valorMudou={setRazaoSocial}
                className="mb-5"
            />
            <Entrada
                texto="Cnpj"
                valor={cnpj}
                valorMudou={setCnpj}
                className="mb-5"
            />
            <div className="flex flex-wrap">
                <Entrada
                    texto="Telefone"
                    valor={telefone}
                    valorMudou={setTelefone}
                    className="mb-5 pr-5"
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
                    onClick={() => props.fornecedorMudou?.(new Fornecedor(id, razao_social, cnpj, telefone, ativo))}
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