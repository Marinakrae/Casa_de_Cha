import Layout from '../components/Layout'
import Tabela from '../components/Lote/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Lote/Formulario'
import 'firebase/compat/firestore';
import useLotes from '../hooks/useLotes'
import Navbar from '../components/Navbar'
import useProdutos from '../hooks/useProdutos'

export default function Home() {

    const {
        lote,
        lotes,
        selecionarLote,
        novoLote,
        salvarLote,
        tabelaVisivel,
        exibirTabela,
    } = useLotes()

    const {
        produtos
    } = useProdutos()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200 pb-1
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Lotes'>
                {tabelaVisivel ? (
                    <>
                        <div className="flex justify-end">
                            <Botao cor='green' className="mb-4" onClick={novoLote}>
                                Novo Lote
                            </Botao>
                        </div>
                        <Tabela lotes={lotes}
                            loteSelecionado={selecionarLote}
                            produtos={produtos} />
                    </>
                ) : (
                    <Formulario
                        lote={lote}
                        loteMudou={salvarLote}
                        cancelado={() => exibirTabela()}
                        produtos={produtos} />
                )}
            </Layout >
        </div >
    )
}
