import { useEffect, useState } from "react"
import Lote from "../core/model/Lote";
import firebase from 'firebase/compat/app';
import ColecaoLote from "../backend/db/ColecaoLote"
import LoteRepositorio from "../core/LoteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useLotes() {
  const repo: LoteRepositorio = new ColecaoLote()

  const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

  const [lote, setLote] = useState<Lote>(Lote.vazio())
  const [lotes, setLotes] = useState<Lote[]>([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
    obterTodos()
  }, [])
  

  function obterTodos() {
    repo.obterTodos().then(lotes => {
      setLotes(lotes)
      exibirTabela()
    })
  }

  function selecionarLote(lote: Lote) {
    setLote(lote)
    exibirFormulario()
  }

  async function salvarLote(lote: Lote) {
    await repo.salvar(lote)
    obterTodos()
  }

  function novoLote() {
    setLote(Lote.vazio())
    exibirFormulario()
  }

  return {
    lote,
    lotes,
    salvarLote,
    novoLote,
    selecionarLote,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
  }
}