import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Tabela from '../components/Categoria/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Categoria/Formulario'
import 'firebase/compat/firestore';
import useCategorias from '../hooks/useCategorias'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {
    categoria,
    categorias,
    selecionarCategoria,
    excluirCategoria,
    novoCategoria,
    salvarCategoria,
    tabelaVisivel,
    exibirTabela,
  } = useCategorias()

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-pink-200
      text-white    
    `}>
      <Navbar />
      <Layout titulo='Categorias'>
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao cor='green' className="mb-4" onClick={novoCategoria}>
                Nova Categoria
              </Botao>
            </div>
            <Tabela categorias={categorias}
              categoriaSelecionado={selecionarCategoria}
              categoriaExcluido={excluirCategoria} />
          </>
        ) : (
          <Formulario
            categoria={categoria}
            categoriaMudou={salvarCategoria}
            cancelado={() => exibirTabela()} />
        )}
      </Layout >
    </div >
  )
}
