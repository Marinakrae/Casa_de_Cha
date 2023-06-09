import Fornecedor from "./model/Fornecedor"

export default interface FornecedorRepositorio {
    salvar(fornecedor: Fornecedor): Promise<Fornecedor>
    excluir(fornecedor: Fornecedor): Promise<void>
    obterTodos(): Promise<Fornecedor[]>
}