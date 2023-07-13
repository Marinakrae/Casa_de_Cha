import Lote from "./model/Lote"

export default interface LoteRepositorio {
    salvar(lote: Lote): Promise<Lote>
    obterTodos(): Promise<Lote[]>
}