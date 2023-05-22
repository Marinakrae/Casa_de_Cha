export default class Categoria {
    private _id: string
    private _nome: string
    private _ativo: boolean

    constructor(nome: string, ativo: boolean, id: string){
        this._nome = nome
        this._ativo = ativo
        this._id = id
    }

    static vazio() {
        return new Categoria('', true, '')
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
