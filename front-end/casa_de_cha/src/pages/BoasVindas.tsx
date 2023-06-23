import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import useUsuarios from '../hooks/useUsuario';
import Usuario from '../core/model/Usuario';
import { useRouter } from 'next/router';

export default function BoasVindas() {
    const { usuarios } = useUsuarios();
    const router = useRouter();
    const { login } = router.query;
    const usuarioLogado = Usuario.vazio();
    const [nomeUsuarioLogado, setNomeUsuarioLogado] = useState('');

    const gifUrl = 'https://i.pinimg.com/originals/7f/30/7f/7f307fd5c5b52052716600a54370e602.gif';

    useEffect(() => {
        usuarioLogado.getNomeByLogin(login as string, usuarios)
            .then(resultado => {
                const nome = String(resultado);
                setNomeUsuarioLogado(nome);
            })
            .catch(erro => {
                console.error('Erro ao obter o nome do usuário:', erro);
            });
    }, [login, usuarioLogado, usuarios]);

    return (
        <div
            className={`
                flex justify-center items-center h-screen
                bg-pink-200
                text-white
            `}
        >
            <Navbar />
            <Layout titulo={`Boas-vindas, ${nomeUsuarioLogado}! :)`}>
                <span>Selecione no menu superior o que deseja fazer.</span>
                <span>&nbsp;&nbsp;</span>
                <img src={gifUrl} alt="GIF animado" style={{ marginTop: '20px', height: '200px' }} />
            </Layout>
        </div>
    );
}
