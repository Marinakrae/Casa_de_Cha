import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import 'firebase/compat/firestore';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import Entrada from '../components/Entrada';
import Botao from '../components/Botao';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div
            className={`
        justify-center items-center h-screen
        bg-pink-200 flex
        text-white
      `}
        >
            <Navbar />
            <Layout titulo={'Login'} className='max-w-lg'>
                <div className="flex justify-center mb-4">
                    <div className="flex items-center">
                        <Image src={logo} alt="Casa de Chá" width={150} height={150} />
                    </div>
                </div>
                <Entrada tipo="email" texto="Email" className="mb-5 mx-10" />
                <Entrada tipo="password" texto="Senha" className="mb-5 mx-10" />
                <Link href="/RecuperarSenha" className='mb-7 mx-10 hover:text-pink-400'>Esqueceu a senha?</Link>
                <div className="flex justify-center">
                    <Link href="/BoasVindas">
                        <Botao cor="green" className="mb-4 mt-4 w-96">
                            Entrar
                        </Botao>
                    </Link>
                </div>
            </Layout>
        </div>
    );
}
