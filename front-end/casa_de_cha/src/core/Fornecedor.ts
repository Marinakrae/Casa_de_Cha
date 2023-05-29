export default class Fornecedor {
    private _id: string
    private _razao_social: string
    private _cnpj: number
    private _telefone: number
    private _ativo: boolean

    constructor(id: string, razao_social: string, cnpj: number, telefone: number, ativo: boolean){
        this._razao_social = razao_social
        this._cnpj = cnpj
        this._telefone = telefone
        this._ativo = ativo
        this._id = id
    }

    static vazio() {
        return new Fornecedor('', '', 0, 0, true)
    }

    get id() {
        return this._id
    }

    get razao_social() {
        return this._razao_social
    }

    get cnpj() {
        return this._cnpj
    }

    get telefone() {
        return this._telefone
    }

    get ativo() {
        return this._ativo
    }
}
