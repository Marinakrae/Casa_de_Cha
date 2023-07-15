import firebase from "../config";
import Lote from "../../core/model/Lote";
import LoteRepositorio from "../../core/LoteRepositorio";
import Produto from "../../core/model/Produto";
import ProdutoRepositorio from "../../core/ProdutoRepositorio";

export default class ColecaoLote implements LoteRepositorio {

  private produtoRepositorio: ProdutoRepositorio;

  constructor(produtoRepositorio: ProdutoRepositorio) {
    this.produtoRepositorio = produtoRepositorio;
  }

    private conversor = {
        toFirestore(lote: Lote) {
            return {
                qtd_lote: lote.qtd_lote,
                dt_validade: lote.dt_validade,
                dt_registro: lote.dt_registro,
                id_produto: lote.id_produto
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Lote {
            const dados = snapshot?.data(options)
            return new Lote(snapshot.id, dados.qtd_lote, dados.dt_validade, dados.dt_registro, dados.id_produto)
        }
    }

    async salvar(lote: Lote): Promise<Lote> {
        if (lote?.id) {
          // Edição
          const produto = await this.produtoRepositorio.obterById(lote.id_produto);
          console.log(produto);
          if (produto) {
            const loteOriginal = await this.colecao().doc(lote.id).get();
            const loteAntigo = loteOriginal.data() as Lote;
            const diferencaQuantidade = loteAntigo.qtd_lote - lote.qtd_lote;

            produto.atualizarQuantidade(produto.qtd_produto - diferencaQuantidade);
            await this.produtoRepositorio.salvar(produto);
          }
          await this.colecao().doc(lote.id).set(lote);
          
          return lote;
        } else {
          const docRef = await this.colecao().add(lote);
          const doc = await docRef.get();
          const loteExistente = doc.data() as Lote | undefined;
          if (loteExistente) {
            console.log(loteExistente)
            const produto = await this.produtoRepositorio.obterById(loteExistente.id_produto);
            console.log(produto)
            if (produto) {
              produto.atualizarQuantidade(+produto.qtd_produto + +loteExistente.qtd_lote);
              await this.produtoRepositorio.salvar(produto);
            }
            return loteExistente;
          } else {
            throw new Error('Lote não encontrado');
          }
        }
        
    }

    async obterTodos(): Promise<Lote[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }    

    private colecao() {
        return firebase.firestore().collection('lotes').withConverter(this.conversor)
    }
}