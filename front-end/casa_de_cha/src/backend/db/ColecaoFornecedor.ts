import firebase from "../config";
import Fornecedor from "../../core/Fornecedor";
import FornecedorRepositorio from "../../core/FornecedorRepositorio";

export default class ColecaoFornecedor implements FornecedorRepositorio {

    private conversor = {
        toFirestore(fornecedor: Fornecedor) {
            return {
                razao_social: fornecedor.razao_social,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                ativo: fornecedor.ativo
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Fornecedor {
            const dados = snapshot?.data(options)
            return new Fornecedor(snapshot.id, dados.razao_social, dados.cnpj, dados.telefone, dados.ativo)
        }
    }

    async salvar(fornecedor: Fornecedor): Promise<Fornecedor> {
        if (fornecedor?.id) {
          //Edição
          await this.colecao().doc(fornecedor.id).set(fornecedor);
          return fornecedor;
        } else {
          const docRef = await this.colecao().add(fornecedor);
          const doc = await docRef.get();
          const fornecedorExistente = doc.data() as Fornecedor | undefined;
          if (fornecedorExistente) {
            return fornecedorExistente;
          } else {
            throw new Error('Fornecedor não encontrado');
          }
        }
      }

    async excluir(fornecedor: Fornecedor): Promise<void> {
        return this.colecao().doc(fornecedor.id).delete()
    }

    async obterTodos(): Promise<Fornecedor[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('fornecedores').withConverter(this.conversor)
    }
}