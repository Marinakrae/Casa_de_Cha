export default class Usuario {
    private _id: string
    private _qtd_lote: number
    private _dt_validade: string
    private _dt_registro: Date
    private _ativo: boolean

    constructor(id: string, qtd_lote: number, dt_validade: string, dt_registro: Date, ativo: boolean){
        this._qtd_lote = qtd_lote
        this._dt_registro = dt_registro
        this._dt_validade = dt_validade
        this._ativo = ativo
        this._id = id
    }

    static vazio() {
        return new Usuario('', 0, '', now(), true) //colocar aqui a currentdate
    }

    get id() {
        return this._id
    }

    get qtd_lote() {
        return this._qtd_lote
    }

    get dt_validade() {
        return this._dt_validade
    }

    get dt_registro() {
        return this._dt_registro
    }

    get ativo() {
        return this._ativo
    }
}
