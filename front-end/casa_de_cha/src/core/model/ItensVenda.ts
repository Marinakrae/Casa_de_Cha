export default class ItensVenda {
    private _id: string
    private _qtd_vendida: number
    private _id_produto: string
    private _id_venda: string

    constructor(id: string, qtd_vendida: number, id_produto: string, id_venda: string){
        this._qtd_vendida = qtd_vendida
        this._id_produto = id_produto
        this._id = id
        this._id_venda = id_venda
    }

    static vazio() {
        const currentDate = new Date();

        return new ItensVenda('', 0, '', '');
    }

    get id() {
        return this._id
    }

    get qtd_vendida() {
        return this._qtd_vendida;
    }

    get id_produto() {
        return this._id_produto;
    }

    get id_venda() {
        return this._id_venda;
    }

    set id(value: string) {
        this._id = value;
      }
    
      set qtd_vendida(value: number) {
        this._qtd_vendida = value;
      }
    
      set id_produto(value: string) {
        this._id_produto = value;
      }
    
      set id_venda(value: string) {
        this._id_venda = value;
      }
}
