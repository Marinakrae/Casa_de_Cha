import Produto from "./model/Produto"

export default interface ProdutoRepositorio {
    salvar(produto: Produto): Promise<Produto>
    excluir(produto: Produto): Promise<void>
    obterTodos(): Promise<Produto[]>
    obterProdutosCategoria(idCategoria: string): Promise<Produto[]>
    obterById(idProduto: string): Promise<Produto>
}