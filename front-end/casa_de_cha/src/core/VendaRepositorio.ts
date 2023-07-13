import Venda from "./model/Venda"

export default interface VendaRepositorio {
    salvar(venda: Venda): Promise<Venda>
    obterTodos(): Promise<Venda[]>
}