import { useEffect, useState } from "react"
import Produto from "../core/model/Produto";
import firebase from 'firebase/compat/app';
import ColecaoProduto from "../backend/db/ColecaoProduto"
import ProdutoRepositorio from "../core/ProdutoRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useProdutos() {
  const repo: ProdutoRepositorio = new ColecaoProduto()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [produto, setProduto] = useState<Produto>(Produto.vazio())
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
    obterTodos()
  }, [])
  

  function obterTodos() {
    repo.obterTodos().then(produtos => {
      setProdutos(produtos)
      exibirTabela()
    })
  }

  function selecionarProduto(produto: Produto) {
    console.log(produto.nome)
    setProduto(produto)
    exibirFormulario()
  }

  async function excluirProduto(produto: Produto) {
    console.log(`Excluir: ${produto.nome}`)
    await repo.excluir(produto)
    obterTodos()
  }

  async function salvarProduto(produto: Produto) {
    await repo.salvar(produto)
    obterTodos()
  }

  function novoProduto() {
    setProduto(Produto.vazio())
    exibirFormulario()
  }

  return {
    produto,
    produtos,
    salvarProduto,
    novoProduto,
    excluirProduto,
    selecionarProduto,
    obterTodos,
    tabelaVisivel,
    exibirTabela
  }
}