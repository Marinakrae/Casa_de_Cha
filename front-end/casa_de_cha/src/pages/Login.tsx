import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import 'firebase/compat/firestore';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import Entrada from '../components/Entrada';
import Botao from '../components/Botao';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Usuario from '../core/model/Usuario';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

interface LoginProps {
    usuario: Usuario
    usuarioMudou?: (cliente: Usuario) => void
}

export default function Login(props: LoginProps) {
    const [login, setLogin] = useState(props.usuario?.login ?? 0)
    const [senha, setSenha] = useState(props.usuario?.senha ?? 0)
    const router = useRouter()

    const handleEntrar = () => {
        // Realizar a autenticação antes de redirecionar

        router.push({
            pathname: '/BoasVindas',
            query: { login: login }
        });
    };


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
                <Entrada texto="Email" className="mb-5 mx-10" valor={login} valorMudou={setLogin} tipo='email' />
                <Entrada texto="Senha" className="mb-5 mx-10" valor={senha} valorMudou={setSenha} tipo='password' />
                <Link href="/RecuperarSenha" className='mb-7 mx-10 hover:text-pink-400'>Esqueceu a senha?</Link>
                <div className="flex justify-center">
                    <Link href="/BoasVindas">
                        <Botao cor="green" className="mb-4 mt-4 w-96" onClick={handleEntrar}>
                            Entrar
                        </Botao>

                    </Link>
                </div>
            </Layout>
        </div>
    );
}
