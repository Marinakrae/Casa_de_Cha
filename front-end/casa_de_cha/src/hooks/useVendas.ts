import { useEffect, useState } from "react"
import Venda from "../core/model/Venda";
import firebase from 'firebase/compat/app';
import ColecaoVenda from "../backend/db/ColecaoVenda"
import VendaRepositorio from "../core/VendaRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useVendas() {
  const repo: VendaRepositorio = new ColecaoVenda()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [venda, setVenda] = useState<Venda>(Venda.vazio())
  const [vendas, setVendas] = useState<Venda[]>([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
    obterTodos()
  }, [])
  

  function obterTodos() {
    repo.obterTodos().then(vendas => {
      setVendas(vendas)
      exibirTabela()
    })
  }

//   function obterVendasCategoria(idCategoria: string) {
//     repo.obterVendasCategoria(idCategoria).then(vendas => {
//       setVendas(vendas)
//     })
//   }

  function selecionarVenda(venda: Venda) {
    console.log(venda.nome)
    setVenda(venda)
    exibirFormulario()
  }

  async function excluirVenda(venda: Venda) {
    console.log(`Excluir: ${venda.nome}`)
    await repo.excluir(venda)
    obterTodos()
  }

  async function salvarVenda(venda: Venda) {
    await repo.salvar(venda)
    obterTodos()
  }

  function novoVenda() {
    setVenda(Venda.vazio())
    exibirFormulario()
  }

  return {
    venda,
    vendas,
    salvarVenda,
    novoVenda,
    excluirVenda,
    selecionarVenda,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
    //obterVendasCategoria
  }
}