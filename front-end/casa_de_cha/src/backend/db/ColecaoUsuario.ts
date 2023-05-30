import firebase from "../config";
import Usuario from "../../core/model/Usuario";
import UsuarioRepositorio from "../../core/UsuarioRepositorio";

export default class ColecaoUsuario implements UsuarioRepositorio {

    private conversor = {
        toFirestore(usuario: Usuario) {
            return {
                nome: usuario.nome,
                login: usuario.login,
                senha: usuario.senha,
                permissao: usuario.permissao,
                ativo: usuario.ativo
            }    
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Usuario {
            const dados = snapshot?.data(options)
            return new Usuario(snapshot.id, dados.nome, dados.login, dados.senha, dados.permissao, dados.ativo)
        }
    }

    async salvar(usuario: Usuario): Promise<Usuario> {
        if (usuario?.id) {
          //Edição
          await this.colecao().doc(usuario.id).set(usuario);
          return usuario;
        } else {
          const docRef = await this.colecao().add(usuario);
          const doc = await docRef.get();
          const usuarioExistente = doc.data() as Usuario | undefined;
          if (usuarioExistente) {
            return usuarioExistente;
          } else {
            throw new Error('Usuario não encontrado');
          }
        }
      }

    async excluir(usuario: Usuario): Promise<void> {
        return this.colecao().doc(usuario.id).delete()
    }

    async obterTodos(): Promise<Usuario[]> {
        const query = await this.colecao().get()
        return query.docs.map((doc: { data: () => any; }) => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('usuarios').withConverter(this.conversor)
    }
}