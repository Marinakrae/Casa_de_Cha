import { useEffect, useState } from "react"
import ItensVenda from "../core/model/ItensVenda";
import firebase from 'firebase/compat/app';
import ColecaoItensVenda from "../backend/db/ColecaoItensVenda"
import ItensVendaRepositorio from "../core/ItensVendaRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"
import Produto from "../core/model/Produto";

export default function useItensVendas() {
  const repo: ItensVendaRepositorio = new ColecaoItensVenda()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [itensvenda, setItensVenda] = useState<ItensVenda>(ItensVenda.vazio())
  const [itensvendas, setItensVendas] = useState<ItensVenda[]>([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
    obterTodos()
  }, [])
  

  function obterTodos() {
    repo.obterTodos().then(itensvendas => {
      setItensVendas(itensvendas)
      exibirTabela()
    })
  }

//   function obterItensVendasCategoria(idCategoria: string) {
//     repo.obterItensVendasCategoria(idCategoria).then(itensvendas => {
//       setItensVendas(itensvendas)
//     })
//   }

  function selecionarItensVenda(itensvenda: ItensVenda) {
    console.log(itensvenda.id)
    setItensVenda(itensvenda)
    exibirFormulario()
  }

  async function salvarItensVenda(itemvenda: ItensVenda, produto: Produto) {
    await repo.salvar(itemvenda, produto)
    obterTodos()
  }

  function novoItensVenda() {
    setItensVenda(ItensVenda.vazio())
    exibirFormulario()
  }

  return {
    itensvenda,
    itensvendas,
    salvarItensVenda,
    novoItensVenda,
    selecionarItensVenda,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
    //obterItensVendasCategoria
  }
}