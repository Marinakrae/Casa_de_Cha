import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import 'firebase/compat/firestore';
import Navbar from '../components/Navbar'
import useUsuarios from '../hooks/useUsuario'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {
        usuario
    } = useUsuarios()

    return (
        <div className={`
      flex justify-center items-center h-screen
      bg-pink-200
      text-white    
    `}>
            <Navbar />
            <Layout titulo='Seja bem-vinda, {usuario.nome}'>
                <span> Selecione no menu superior o que deseja fazer.</span>
                <img src="../assets/gif-cha.gif" alt="GIF animado" />
            </Layout >
        </div >
    )
}
