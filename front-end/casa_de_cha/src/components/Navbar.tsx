import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('white');

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90) {
                setColor('#ffffff');
                setTextColor('#000000');
            } else {
                setColor('transparent');
                setTextColor('#ffffff');
            }
        };

        window.addEventListener('scroll', changeColor);

        return () => {
            window.removeEventListener('scroll', changeColor);
        };
    }, []);

    return (
        <nav>
            <div
                style={{ backgroundColor: 'bg-amber-900' }}
                className="fixed left-0 top-0 w-full z-10 ease-in duration-300 bg-amber-900"
            >
                <div className="max-w-full m-auto h-16 flex justify-between items-center p-4 text-white mx-0">
                    <Link href="/BoasVindas">
                        <Image src={logo} alt="Casa de Chá" width={80} height={80} />
                    </Link>
                    <ul
                        style={{ color: textColor }}
                        className="hidden sm:flex flex-grow ml-20"
                    >
                        <li className="p-4 text-lg">
                            <Link href="/#">Registrar Venda</Link>
                        </li>
                        <li className="p-4 text-lg">
                            <Link href="/Lote">Registrar Lote</Link>
                        </li>
                        <li className="p-4 relative text-lg group">
                            <span className="cursor-pointer">Cadastros</span>
                            <ul className="absolute left-0 mt-2 py-2 bg-amber-900 text-white rounded-md space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <li>
                                    <Link href="/Categoria">Categorias</Link>
                                </li>
                                <li>
                                    <Link href="/Fornecedor">Fornecedores</Link>
                                </li>
                                <li>
                                    <Link href="/Produto">Produtos</Link>
                                </li>
                                <li>
                                    <Link href="/Usuario">Usuários</Link>
                                </li>
                                <li>
                                    <Link href="/Lote">Lotes</Link>
                                </li>
                                <li>
                                    <Link href="/Venda">Vendas</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="p-4 ml-auto text-lg">
                            <Link href="/Login">Sair</Link>
                        </li>
                    </ul>

                    {/* Mobile Button */}
                    <div onClick={handleNav} className="block sm:hidden z-10">
                        {nav ? (
                            <AiOutlineClose
                                size={20}
                                style={{ color: textColor }}
                            />
                        ) : (
                            <AiOutlineMenu
                                size={20}
                                style={{ color: textColor }}
                            />
                        )}
                    </div>
                    {/* Mobile Menu */}
                    <div
                        className={
                            nav
                                ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-pink-200 text-center ease-in duration-300'
                                : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-pink-200 text-center ease-in duration-300'
                        }
                    >
                        <ul>
                            <li
                                onClick={handleNav}
                                className="p-4 text-4xl text-amber-900 hover:text-pink-500"
                            >
                                <Link href="/#">Registrar Venda</Link>
                            </li>
                            <li
                                onClick={handleNav}
                                className="p-4 text-4xl text-amber-900 hover:text-pink-500"
                            >
                                <Link href="/#">Registrar Lote</Link>
                            </li>
                            <li
                                onClick={handleNav}
                                className="p-4 relative text-4xl text-amber-900 hover:text-pink-500 group"
                            >
                                <span className="cursor-pointer">Cadastros</span>
                                <ul className="bg-pink-200 text-amber-900 rounded-md p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <li>
                                        <Link href="/categorias" className='hover:text-pink-500'>Categoria</Link>
                                    </li>
                                    <li>
                                        <Link href="/fornecedores" className='hover:text-pink-500'>Fornecedor</Link>
                                    </li>
                                    <li>
                                        <Link href="/produtos" className='hover:text-pink-500'>Produto</Link>
                                    </li>
                                </ul>
                            </li>
                            <li
                                onClick={handleNav}
                                className="p-4 text-4xl text-amber-900 hover:text-pink-500"
                            >
                                <Link href="/#">Sair</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
