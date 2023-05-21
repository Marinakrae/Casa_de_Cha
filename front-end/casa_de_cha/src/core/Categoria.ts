export default class Categoria {
    private _id: string | undefined
    private _nome: string
    private _ativo: boolean

    constructor(nome: string, ativo: boolean){
        this._nome = nome
        this._ativo = ativo
    }

    static vazio() {
        return new Categoria('', true)
    }

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get ativo() {
        return this._ativo
    }
}
