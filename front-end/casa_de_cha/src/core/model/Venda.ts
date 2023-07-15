import { format } from "date-fns"

export default class Venda {
    private _id: string
    private _valor_total: number
    private _dt_venda: string
    private _id_itens_venda: string
    private _vendedor : string

    constructor(id: string, valor_total: number, dt_venda: string, id_itens_venda: string, vendedor: string){
        this._valor_total = valor_total
        this._dt_venda = dt_venda
        this._id = id
        this._id_itens_venda = id_itens_venda
        this._vendedor = vendedor
    }

    static vazio() {
        const currentDate = new Date();

        return new Venda('', 0, format(currentDate, 'dd/MM/yyyy'), '', '');
    }

    get id() {
        return this._id
    }

    get valor_total() {
        return this._valor_total
    }

    get dt_venda() {
        return this._dt_venda
    }

    get id_itens_venda() {
        return this._id_itens_venda;
    }

    get vendedor(){
        return this._vendedor
    }
}
