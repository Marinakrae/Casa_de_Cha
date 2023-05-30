import Usuario from "./model/Usuario"

export default interface UsuarioRepositorio {
    salvar(usuario: Usuario): Promise<Usuario>
    excluir(usuario: Usuario): Promise<void>
    obterTodos(): Promise<Usuario[]>
}