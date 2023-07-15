import firebase from "../config";
import Venda from "../../core/model/Venda";
import VendaRepositorio from "../../core/VendaRepositorio";

export default class ColecaoVenda implements VendaRepositorio {

    private conversor = {
        toFirestore(venda: Venda) {
            return {
                valor_total: venda.valor_total,
                dt_venda: venda.dt_venda,
                id_itens_venda: venda.id_itens_venda
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Venda {
            const dados = snapshot?.data(options)
            return new Venda(snapshot.id, dados.valor_total, dados.dt_venda, dados.id_itens_venda)
        }
    }

    async salvar(venda: Venda): Promise<Venda> {
          const docRef = await this.colecao().add(venda);
          const doc = await docRef.get();
          const vendaExistente = doc.data() as Venda | undefined;
          if (vendaExistente) {
            return vendaExistente;
          } else {
            throw new Error('Venda não encontrada');
          }
      }

    async obterTodos(): Promise<Venda[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    // async obterVendasCategoria(idCategoria: string): Promise<Venda[]> {
    //   const query = await this.colecao().where('idCategoria', '==', idCategoria).get();
    //   return query.docs.map((doc) => doc.data()) ?? [];
    // }
    
    private colecao() {
        return firebase.firestore().collection('vendas').withConverter(this.conversor)
    }
}