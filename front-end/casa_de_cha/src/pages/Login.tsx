import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import 'firebase/compat/firestore';
import logo from '../assets/logo.png';
import Entrada from '../components/Entrada';
import Botao from '../components/Botao';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Usuario from '../core/model/Usuario';
import { useRouter } from 'next/router';
import useUsuarios from '../hooks/useUsuario';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

interface LoginProps {
    usuario: Usuario;
    usuarioMudou?: (cliente: Usuario) => void;
}

export default function Login(props: LoginProps) {
    const [login, setLogin] = useState(props.usuario?.login ?? '');
    const [senha, setSenha] = useState(props.usuario?.senha ?? '');
    const router = useRouter();

    const { usuarios } = useUsuarios();

    const handleEntrar = () => {
        // Realizar a validação do login e senha
        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.login === login && usuario.senha === senha
        );

        if (usuarioEncontrado) {
            router.push({
                pathname: '/BoasVindas',
                query: { login: login },
            });
        } else {
            alert('Credenciais incorretas. Tente novamente.');
        }
    };

    const exibirNavbar = !router.pathname.includes('/Login');

    return (
        <div
            className={`
        justify-center items-center h-screen
        bg-pink-200 flex
        text-white
      `}
        >
            {exibirNavbar && <Navbar />}
            <Layout titulo={'Login'} className="max-w-lg">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center">
                        <Image src={logo} alt="Casa de Chá" width={150} height={150} />
                    </div>
                </div>
                <Entrada
                    texto="Email"
                    className="mb-5 mx-10"
                    valor={login}
                    valorMudou={setLogin}
                    tipo="email"
                />
                <Entrada
                    texto="Senha"
                    className="mb-5 mx-10"
                    valor={senha}
                    valorMudou={setSenha}
                    tipo="password"
                />
                <div className="flex justify-center">
                    <Botao
                        cor="green"
                        className="mb-4 mt-4 w-96"
                        onClick={handleEntrar}
                    >
                        Entrar
                    </Botao>
                </div>
            </Layout>
        </div>
    );
}
