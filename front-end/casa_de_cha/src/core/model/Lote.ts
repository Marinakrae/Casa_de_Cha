import { format } from 'date-fns';

export default class Lote {
    private _id: string
    private _qtd_lote: number
    private _dt_validade: string
    private _dt_registro: string
    private _id_produto: string

    constructor(id: string, qtd_lote: number, dt_validade: string, dt_registro: string, id_produto: string){
        this._qtd_lote = qtd_lote
        this._dt_registro = dt_registro
        this._dt_validade = dt_validade
        this._id = id
        this._id_produto = id_produto
    }

    static vazio() {
        const currentDate = new Date();

        return new Lote('', 0, '', format(currentDate, 'dd/MM/yyyy'), '');
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

    get id_produto() {
        return this._id_produto
    }
}
