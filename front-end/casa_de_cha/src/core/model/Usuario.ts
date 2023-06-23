import useUsuarios from "../../hooks/useUsuario"
import reposi from "../UsuarioRepositorio"

export default class Usuario {
    private _id: string
    private _nome: string
    private _login: string
    private _senha: string
    private _permissao: string
    private _ativo: boolean

    constructor(id: string, nome: string, login: string, senha: string, permissao: string, ativo: boolean){
        this._nome = nome
        this._login = login
        this._senha = senha
        this._permissao = permissao
        this._ativo = ativo
        this._id = id
    }

    static vazio() {
        return new Usuario('', '', '', '', '', true)
    }

    async getNomeByLogin(login: string, usuarios: Usuario[]): Promise<string> {
        const usuario = usuarios.find((u) => u.login === login);
        return usuario ? usuario.nome : '';
      }      

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get login() {
        return this._login
    }

    get senha() {
        return this._senha
    }

    get permissao() {
        return this._permissao
    }

    get ativo() {
        return this._ativo
    }
}
