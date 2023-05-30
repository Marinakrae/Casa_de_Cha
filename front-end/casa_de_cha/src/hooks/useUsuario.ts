import { useEffect, useState } from "react"
import Usuario from "../core/model/Usuario";
import firebase from 'firebase/compat/app';
import ColecaoUsuario from "../backend/db/ColecaoUsuario"
import UsuarioRepositorio from "../core/UsuarioRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useUsuarios() {
  const repo: UsuarioRepositorio = new ColecaoUsuario()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [usuario, setUsuario] = useState<Usuario>(Usuario.vazio())
  const [usuarios, setUsuarioes] = useState<Usuario[]>([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
    obterTodos()
  }, [])
  

  function obterTodos() {
    console.log('obter todos')
    repo.obterTodos().then(usuarios => {
      setUsuarioes(usuarios)
      exibirTabela()
    })
  }

  function selecionarUsuario(usuario: Usuario) {
    setUsuario(usuario)
    exibirFormulario()
  }

  async function excluirUsuario(usuario: Usuario) {
    await repo.excluir(usuario)
    obterTodos()
  }

  async function salvarUsuario(usuario: Usuario) {
    await repo.salvar(usuario)
    obterTodos()
  }

  function novoUsuario() {
    setUsuario(Usuario.vazio())
    exibirFormulario()
  }

  return {
    usuario,
    usuarios,
    salvarUsuario,
    novoUsuario,
    excluirUsuario,
    selecionarUsuario,
    obterTodos,
    tabelaVisivel,
    exibirTabela
  }
}