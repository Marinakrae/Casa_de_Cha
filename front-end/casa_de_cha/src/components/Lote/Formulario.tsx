import Lote from "../../core/model/Lote"
import Categoria from "../../core/model/Categoria"
import Botao from "../Botao"
import Entrada from "../Entrada"
import { useState } from "react"
import { IMaskInput } from "react-imask";
import Fornecedor from "../../core/model/Fornecedor"
import Produto from "../../core/model/Produto"

interface FormularioProps {
    lote: Lote
    loteMudou?: (cliente: Lote) => void
    cancelado?: () => void
    produtos: Produto[]
}

function filtrarProdutosAtivos(produtos: Produto[]) {
    return produtos.filter(produto => produto.ativo);
}

export default function Formulario(props: FormularioProps) {
    const id = props.lote?.id
    const [qtd_lote, setQtdLote] = useState(props.lote?.qtd_lote ?? 0)
    const [dt_validade, setDtValidade] = useState(props.lote?.dt_validade ?? '')
    const [dt_registro, setDtRegistro] = useState(props.lote?.dt_registro ?? '')
    const [id_produto, setIdProduto] = useState(props.lote?.id_produto ?? 0)
    const produtos = filtrarProdutosAtivos(props.produtos)

    return (
        <div>
            <Entrada
                texto="Produto"
                valor={id_produto}
                valorMudou={setIdProduto}
                className="mb-5 pr-5"
                produtos={produtos}
            />
            <div className="flex flex-wrap">
                <Entrada
                    texto="Data de Registro"
                    valor={String(dt_registro)}
                    valorMudou={setDtRegistro}
                    className="mb-5 pr-5"
                    metadeLargura
                />
                <Entrada
                    texto="Data de Validade"
                    valor={dt_validade}
                    valorMudou={setDtValidade}
                    className="mb-5"
                    metadeLargura
                />
            </div>
            <div className="flex flex-wrap">
                <Entrada
                    tipo="number"
                    texto="Quantidade Registrada"
                    valor={qtd_lote}
                    valorMudou={setQtdLote}
                    className="mb-5 pr-5"
                    metadeLargura
                />
            </div>
            <div className="flex justify-end mt-4">
                <Botao cor='blue' className="mr-2"
                    onClick={() => props.loteMudou?.(new Lote(id, qtd_lote, dt_validade, dt_registro, id_produto))}
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