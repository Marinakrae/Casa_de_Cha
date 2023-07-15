import ItensVenda from "./model/ItensVenda"
import Produto from "./model/Produto"

export default interface ItensVendaRepositorio {
    salvar(itensVenda: ItensVenda, produto: Produto): Promise<ItensVenda>
    obterTodos(): Promise<ItensVenda[]>
}