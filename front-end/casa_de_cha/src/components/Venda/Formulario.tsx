import Venda from "../../core/model/Venda"
import Categoria from "../../core/model/Categoria"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"
import { IMaskInput } from "react-imask";
import Fornecedor from "../../core/model/Fornecedor"

interface FormularioProps {
    venda: Venda
    vendaMudou?: (cliente: Venda) => void
    cancelado?: () => void
    categorias: Categoria[]
    fornecedores: Fornecedor[]
}

function filtrarCategoriasAtivas(categorias: Categoria[]) {
    return categorias.filter(categoria => categoria.ativo);
}

function filtrarFornecedoresAtivos(fornecedores: Fornecedor[]) {
    return fornecedores.filter(fornecedor => fornecedor.ativo);
}

export default function Formulario(props: FormularioProps) {
    const id = props.venda?.id
    const [nome, setNome] = useState(props.venda?.nome ?? '')
    const [descricao, setDescricao] = useState(props.venda?.descricao ?? '')
    const [custo, setCusto] = useState(props.venda?.custo ?? 0)
    const [qtd_venda, setQtdVenda] = useState(props.venda?.qtd_venda ?? 0)
    const [valor_venda, setValorVenda] = useState(props.venda?.valor_venda ?? 0)
    const [ativo, setAtivo] = useState(props.venda?.ativo ?? 0)
    const [id_categoria, setIdCategoria] = useState(props.venda?.id_categoria ?? 0)
    const [id_fornecedor, setIdFornecedor] = useState(props.venda?.id_fornecedor ?? 0)
    const categorias = filtrarCategoriasAtivas(props.categorias)
    const fornecedores = filtrarFornecedoresAtivos(props.fornecedores)

    return (
        <div>
            <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-5"
            />
            <Entrada
                texto="Descrição"
                valor={descricao}
                valorMudou={setDescricao}
                className="mb-5"
            />
            <div className="flex flex-wrap">
                <Entrada
                    texto="Fornecedor"
                    valor={id_fornecedor}
                    valorMudou={setIdFornecedor}
                    className="mb-5 pr-5"
                    metadeLargura
                    fornecedores={fornecedores}
                />
                <Entrada
                    texto="Categoria"
                    valor={id_categoria}
                    valorMudou={setIdCategoria}
                    className="mb-5"
                    metadeLargura
                    categorias={categorias}
                />
            </div>
            {/* <IMaskInput
                mask={Number}
                radix="."
                thousandsSeparator=","
                placeholder="Digite o custo de aquisição do venda"
                value={custo}
            /> */}
            <div className="flex flex-wrap">
                <Entrada
                    tipo="number"
                    texto="Custo"
                    valor={custo}
                    valorMudou={setCusto}
                    className="mb-5 pr-5"
                    metadeLargura
                />
                <Entrada
                    tipo="number"
                    texto="Valor Venda"
                    valor={valor_venda}
                    valorMudou={setValorVenda}
                    className="mb-5"
                    metadeLargura
                />
            </div>
            <div className="flex flex-wrap">
                <Entrada
                    tipo="number"
                    texto="Quantidade Disponível"
                    valor={qtd_venda}
                    valorMudou={setQtdVenda}
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
            <div className="flex justify-end mt-4">
                <Botao cor='blue' className="mr-2"
                    onClick={() => props.vendaMudou?.(new Venda(id, nome, descricao, custo, qtd_venda, valor_venda, ativo, id_categoria, id_fornecedor))}
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