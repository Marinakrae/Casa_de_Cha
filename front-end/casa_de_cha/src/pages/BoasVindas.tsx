import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import 'firebase/compat/firestore';
import Navbar from '../components/Navbar';
import useUsuarios from '../hooks/useUsuario';
import Usuario from '../core/model/Usuario';

const inter = Inter({ subsets: ['latin'] });

interface BoasVindasProps {
    usuarioLogado: Usuario;
}

export default function Home(props: BoasVindasProps) {
    const usuarioLogado = props.usuarioLogado || Usuario.vazio;
    const gifUrl = 'https://i.pinimg.com/originals/7f/30/7f/7f307fd5c5b52052716600a54370e602.gif';

    return (
        <div
            className={`
                flex justify-center items-center h-screen
                bg-pink-200
                text-white
            `}
        >
            <Navbar />
            <Layout titulo={`Boas-vindas, ${usuarioLogado.nome}! :)`}>
                <span>Selecione no menu superior o que deseja fazer.</span>
                <span>&nbsp;&nbsp;</span>
                <img src={gifUrl} alt="GIF animado" style={{ marginTop: '20px', height: '200px' }} />
            </Layout>
        </div>
    );
}
