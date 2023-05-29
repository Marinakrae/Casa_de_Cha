import { useEffect, useState } from "react"
import Fornecedor from "../core/Fornecedor"
import firebase from 'firebase/compat/app';
import ColecaoFornecedor from "../backend/db/ColecaoFornecedor"
import FornecedorRepositorio from "../core/FornecedorRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useFornecedores() {
  const repo: FornecedorRepositorio = new ColecaoFornecedor()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [fornecedor, setFornecedor] = useState<Fornecedor>(Fornecedor.vazio())
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])

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
    repo.obterTodos().then(fornecedores => {
      setFornecedores(fornecedores)
      exibirTabela()
    })
  }

  function selecionarFornecedor(fornecedor: Fornecedor) {
    setFornecedor(fornecedor)
    exibirFormulario()
  }

  async function excluirFornecedor(fornecedor: Fornecedor) {
    await repo.excluir(fornecedor)
    obterTodos()
  }

  async function salvarFornecedor(fornecedor: Fornecedor) {
    await repo.salvar(fornecedor)
    obterTodos()
  }

  function novoFornecedor() {
    setFornecedor(Fornecedor.vazio())
    exibirFormulario()
  }

  return {
    fornecedor,
    fornecedores,
    salvarFornecedor,
    novoFornecedor,
    excluirFornecedor,
    selecionarFornecedor,
    obterTodos,
    tabelaVisivel,
    exibirTabela
  }
}