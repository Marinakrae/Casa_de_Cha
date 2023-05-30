import Categoria from "./model/Categoria"

export default interface CategoriaRepositorio {
    salvar(categoria: Categoria): Promise<Categoria>
    excluir(categoria: Categoria): Promise<void>
    obterTodos(): Promise<Categoria[]>
}