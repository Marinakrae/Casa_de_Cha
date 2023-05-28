import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Tabela from '../components/Produto/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Produto/Formulario'
import 'firebase/compat/firestore';
import useProdutos from '../hooks/useProdutos'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {
        produto,
        produtos,
        selecionarProduto,
        excluirProduto,
        novoProduto,
        salvarProduto,
        tabelaVisivel,
        exibirTabela,
    } = useProdutos()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200 pb-1
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Produtos'>
                {tabelaVisivel ? (
                    <>
                        <div className="flex justify-end">
                            <Botao cor='green' className="mb-4" onClick={novoProduto}>
                                Novo Produto
                            </Botao>
                        </div>
                        <Tabela produtos={produtos}
                            produtoSelecionado={selecionarProduto}
                            produtoExcluido={excluirProduto} />
                    </>
                ) : (
                    <Formulario
                        produto={produto}
                        produtoMudou={salvarProduto}
                        cancelado={() => exibirTabela()} />
                )}
            </Layout >
        </div >
    )
}
