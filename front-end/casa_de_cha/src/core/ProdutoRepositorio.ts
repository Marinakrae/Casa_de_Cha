import Produto from "./model/Produto"

export default interface ProdutoRepositorio {
    salvar(produto: Produto): Promise<Produto>
    excluir(produto: Produto): Promise<void>
    obterTodos(): Promise<Produto[]>
}