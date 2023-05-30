import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Tabela from '../components/Usuario/Tabela'
import Botao from '../components/Botao'
import Formulario from '../components/Usuario/Formulario'
import 'firebase/compat/firestore';
import useUsuario from '../hooks/useUsuario'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {
        usuario,
        usuarios,
        selecionarUsuario,
        excluirUsuario,
        novoUsuario,
        salvarUsuario,
        tabelaVisivel,
        exibirTabela,
    } = useUsuario()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Usuários'>
                {tabelaVisivel ? (
                    <>
                        <div className="flex justify-end">
                            <Botao cor='green' className="mb-4" onClick={novoUsuario}>
                                Novo Usuario
                            </Botao>
                        </div>
                        <Tabela usuarios={usuarios}
                            usuarioSelecionado={selecionarUsuario}
                            usuarioExcluido={excluirUsuario} />
                    </>
                ) : (
                    <Formulario
                        usuario={usuario}
                        usuarioMudou={salvarUsuario}
                        cancelado={() => exibirTabela()} />
                )}
            </Layout >
        </div >
    )
}
