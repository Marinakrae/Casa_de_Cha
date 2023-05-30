import { useEffect, useState } from "react"
import Categoria from "../core/model/Categoria";
import firebase from 'firebase/compat/app';
import ColecaoCategoria from "../backend/db/ColecaoCategoria"
import CategoriaRepositorio from "../core/CategoriaRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useCategorias() {
  const repo: CategoriaRepositorio = new ColecaoCategoria()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [categoria, setCategoria] = useState<Categoria>(Categoria.vazio())
  const [categorias, setCategorias] = useState<Categoria[]>([])

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
    repo.obterTodos().then(categorias => {
      setCategorias(categorias)
      exibirTabela()
    })
  }

  function selecionarCategoria(categoria: Categoria) {
    console.log(categoria.nome)
    setCategoria(categoria)
    exibirFormulario()
  }

  async function excluirCategoria(categoria: Categoria) {
    console.log(`Excluir: ${categoria.nome}`)
    await repo.excluir(categoria)
    obterTodos()
  }

  async function salvarCategoria(categoria: Categoria) {
    await repo.salvar(categoria)
    obterTodos()
  }

  function novoCategoria() {
    setCategoria(Categoria.vazio())
    exibirFormulario()
  }

  return {
    categoria,
    categorias,
    salvarCategoria,
    novoCategoria,
    excluirCategoria,
    selecionarCategoria,
    obterTodos,
    tabelaVisivel,
    exibirTabela
  }
}