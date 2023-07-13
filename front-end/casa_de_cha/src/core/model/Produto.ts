export default class Produto {
    private _id: string
    private _nome: string
    private _descricao: string
    private _custo: number
    private _qtd_produto: number
    private _valor_venda: number
    private _ativo: boolean
    private _id_categoria: string
    private _id_fornecedor: string

    constructor(id: string, nome: string, descricao: string, custo: number, qtd_produto: number,
                valor_venda: number, ativo: boolean, id_categoria: string, id_fornecedor: string){
        this._nome = nome
        this._ativo = ativo
        this._id = id
        this._descricao = descricao
        this._custo = custo
        this._qtd_produto = qtd_produto
        this._valor_venda = valor_venda
        this._id_categoria = id_categoria
        this._id_fornecedor = id_fornecedor
    }

    static vazio() {
        return new Produto('', '', '', 0, 0, 0, true, '', '')
    }

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get descricao() {
        return this._descricao
    }

    get custo() {
        return this._custo
    }

    get qtd_produto() {
        return this._qtd_produto
    }

    get valor_venda() {
        return this._valor_venda
    }

    get ativo() {
        return this._ativo
    }

    get id_categoria() {
        return this._id_categoria
    }

    get id_fornecedor() {
        return this._id_fornecedor
    }

    atualizarQuantidade(novaQuantidade: number) {
        this._qtd_produto = novaQuantidade;
    }
}
