import Layout from '../components/Layout'
import Tabela from '../components/Venda/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Venda/Formulario'
import 'firebase/compat/firestore';
import useVendas from '../hooks/useVendas'
import Navbar from '../components/Navbar'
import useProdutos from '../hooks/useProdutos';
import useUsuarios from '../hooks/useUsuario';

export default function Home() {

    const {
        venda,
        vendas,
        selecionarVenda,
        novoVenda,
        salvarVenda,
        tabelaVisivel,
        exibirTabela,
    } = useVendas()

    const {
        produtos
    } = useProdutos()

    const {
        usuarios
    } = useUsuarios()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200 pb-1
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Vendas'>
                {tabelaVisivel ? (
                    <>
                        <div className="flex justify-end">
                            <Botao cor='green' className="mb-4" onClick={novoVenda}>
                                Registrar Venda
                            </Botao>
                        </div>
                        <Tabela vendas={vendas}
                            vendaSelecionado={selecionarVenda}
                            produtos={produtos} itensVenda={[]} />
                    </>
                ) : (
                    <Formulario
                        venda={venda}
                        vendaMudou={salvarVenda}
                        cancelado={() => exibirTabela()}
                        produtos={produtos} usuarios={usuarios} itensVenda={[]} />
                )}
            </Layout >
        </div >
    )
}
