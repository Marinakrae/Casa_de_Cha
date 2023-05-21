import firebase from "../config";
import Categoria from "../../core/Categoria";
import CategoriaRepositorio from "../../core/CategoriaRepositorio";

export default class ColecaoCategoria implements CategoriaRepositorio {

    private conversor = {
        toFirestore(categoria: Categoria) {
            return {
                nome: categoria.nome,
                ativo: categoria.ativo
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Categoria {
            const dados = snapshot?.data(options)
            return new Categoria(dados.nome, dados.ativo, snapshot.id)
        }
    }

    async salvar(categoria: Categoria): Promise<Categoria> {
        if (categoria?.id) {
          await this.colecao().doc(categoria.id).set(categoria);
          return categoria;
        } else {
          const docRef = await this.colecao().add(categoria);
          const doc = await docRef.get();
          const categoriaExistente = doc.data() as Categoria | undefined;
          if (categoriaExistente) {
            return categoriaExistente;
          } else {
            throw new Error('Categoria não encontrado');
          }
        }
      }

    async excluir(categoria: Categoria): Promise<void> {
        return this.colecao().doc(categoria.id).delete()
    }

    async obterTodos(): Promise<Categoria[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('categorias').withConverter(this.conversor)
    }
}