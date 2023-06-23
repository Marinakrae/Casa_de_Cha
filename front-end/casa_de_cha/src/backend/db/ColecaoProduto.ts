import firebase from "../config";
import Produto from "../../core/model/Produto";
import ProdutoRepositorio from "../../core/ProdutoRepositorio";

export default class ColecaoProduto implements ProdutoRepositorio {

    private conversor = {
        toFirestore(produto: Produto) {
            return {
                nome: produto.nome,
                descricao: produto.descricao,
                custo: produto.custo,
                qtd_produto: produto.qtd_produto,
                valor_venda: produto.valor_venda,
                ativo: produto.ativo,
                id_categoria: produto.id_categoria,
                id_fornecedor: produto.id_fornecedor
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Produto {
            const dados = snapshot?.data(options)
            return new Produto(snapshot.id, dados.nome, dados.descricao, dados.custo, dados.qtd_produto, dados.valor_venda, dados.ativo, dados.id_categoria, dados.id_fornecedor)
        }
    }

    async salvar(produto: Produto): Promise<Produto> {
        if (produto?.id) {
          //Edição
          await this.colecao().doc(produto.id).set(produto);
          return produto;
        } else {
          const docRef = await this.colecao().add(produto);
          const doc = await docRef.get();
          const produtoExistente = doc.data() as Produto | undefined;
          if (produtoExistente) {
            return produtoExistente;
          } else {
            throw new Error('Produto não encontrado');
          }
        }
      }

    async excluir(produto: Produto): Promise<void> {
        return this.colecao().doc(produto.id).delete()
    }

    async obterTodos(): Promise<Produto[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    async obterProdutosCategoria(idCategoria: string): Promise<Produto[]> {
      const query = await this.colecao().where('idCategoria', '==', idCategoria).get();
      return query.docs.map((doc) => doc.data()) ?? [];
    }
    

    private colecao() {
        return firebase.firestore().collection('produtos').withConverter(this.conversor)
    }
}