export default class Venda {
    private _id: string
    private _valor_total: number
    private _dt_venda: string
    private _dt_registro: Date
    private _ativo: boolean

    constructor(id: string, valor_total: number, dt_venda: string, dt_registro: Date, ativo: boolean){
        this._valor_total = valor_total
        this._dt_registro = dt_registro
        this._dt_venda = dt_venda
        this._ativo = ativo
        this._id = id
    }

    static vazio() {
        const currentDate = new Date();
        //const formattedDate = format(currentDate, 'yyyy-MM-dd'); 
        
        return new Venda('', 0, '', currentDate, true);
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

    get dt_registro() {
        return this._dt_registro
    }

    get ativo() {
        return this._ativo
    }
}
