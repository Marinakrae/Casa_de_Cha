import firebase from "../config";
import ItensVenda from "../../core/model/ItensVenda";
import ItensVendaRepositorio from "../../core/ItensVendaRepositorio";
import Produto from "../../core/model/Produto";

export default class ColecaoItensVenda implements ItensVendaRepositorio {

    private conversor = {
        toFirestore(itensvenda: ItensVenda) {
            return {
                qtd_vendida: itensvenda.qtd_vendida,
                id_venda: itensvenda.id_venda,
                id_produto: itensvenda.id_produto
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): ItensVenda {
            const dados = snapshot?.data(options)
            return new ItensVenda(snapshot.id, dados.qtd_vendida, dados.id_venda, dados.id_produto)
        }
    }

    async salvar(itensVenda: ItensVenda, produto: Produto): Promise<ItensVenda> {
          const docRef = await this.colecao().add(itensVenda);
          const doc = await docRef.get();
          const itensvendaExistente = doc.data() as ItensVenda | undefined;
          if (itensvendaExistente) {
            return itensvendaExistente;
          } else {
            throw new Error('Itens venda não encontrada');
          }
      }

    async obterTodos(): Promise<ItensVenda[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    // async obterItensVendasCategoria(idCategoria: string): Promise<ItensVenda[]> {
    //   const query = await this.colecao().where('idCategoria', '==', idCategoria).get();
    //   return query.docs.map((doc) => doc.data()) ?? [];
    // }
    
    private colecao() {
        return firebase.firestore().collection('itensvendas').withConverter(this.conversor)
    }
}