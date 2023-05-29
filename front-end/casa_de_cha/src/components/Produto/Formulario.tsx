import Produto from "../../core/Produto"
import Categoria from "../../core/Categoria"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"

interface FormularioProps {
    produto: Produto
    produtoMudou?: (cliente: Produto) => void
    cancelado?: () => void
    categorias?: Categoria[]
}

export default function Formulario(props: FormularioProps) {
    const id = props.produto?.id
    const [nome, setNome] = useState(props.produto?.nome ?? '')
    const [descricao, setDescricao] = useState(props.produto?.descricao ?? '')
    const [custo, setCusto] = useState(props.produto?.custo ?? 0)
    const [qtd_produto, setQtdProduto] = useState(props.produto?.qtd_produto ?? 0)
    const [valor_venda, setValorVenda] = useState(props.produto?.valor_venda ?? 0)
    const [ativo, setAtivo] = useState(props.produto?.ativo ?? 0)
    const [id_categoria, setIdCategoria] = useState(props.produto?.id_categoria ?? 0)
    const [id_fornecedor, setIdFornecedor] = useState(props.produto?.id_fornecedor ?? 0)
    const categorias = props.categorias

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
                    valor={qtd_produto}
                    valorMudou={setQtdProduto}
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
                    onClick={() => props.produtoMudou?.(new Produto(id, nome, descricao, custo, qtd_produto, valor_venda, ativo, id_categoria, id_fornecedor))}
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