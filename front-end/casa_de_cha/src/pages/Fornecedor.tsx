import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Tabela from '../components/Fornecedor/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Fornecedor/Formulario'
import 'firebase/compat/firestore';
import useFornecedores from '../hooks/useFornecedores'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {
        fornecedor,
        fornecedores,
        selecionarFornecedor,
        excluirFornecedor,
        novoFornecedor,
        salvarFornecedor,
        tabelaVisivel,
        exibirTabela,
    } = useFornecedores()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Fornecedores'>
                {tabelaVisivel ? (
                    <>
                        <div className="flex justify-end">
                            <Botao cor='green' className="mb-4" onClick={novoFornecedor}>
                                Novo Fornecedor
                            </Botao>
                        </div>
                        <Tabela fornecedores={fornecedores}
                            fornecedorSelecionado={selecionarFornecedor}
                            fornecedorExcluido={excluirFornecedor} />
                    </>
                ) : (
                    <Formulario
                        fornecedor={fornecedor}
                        fornecedorMudou={salvarFornecedor}
                        cancelado={() => exibirTabela()} />
                )}
            </Layout >
        </div >
    )
}
