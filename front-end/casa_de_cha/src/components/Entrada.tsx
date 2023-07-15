import React from "react";

interface EntradaProps {
    tipo?: 'text' | 'number' | 'email' | 'password';
    texto: string;
    valor?: string | number;
    somenteLeitura?: boolean;
    className?: string;
    valorMudou?: (valor: any) => void;
    metadeLargura?: boolean;
    mascaraMonetaria?: boolean;
    categorias?: Array<{ id: string | number; nome: string; ativo: boolean }>; // lista de categorias
    fornecedores?: Array<{ id: string | number; razao_social: string; cnpj: number, telefone: number, ativo: boolean }>; // lista de fornecedores
    vendedores?: Array<{ id: string | number; nome: string; login: string, senha: string, permissao: string, ativo: boolean }>;
    produtos?: Array<{
        id: string | number;
        nome: string;
        descricao: string;
        custo: number;
        qtd_produto: number;
        valor_venda: number;
        ativo: boolean;
        id_categoria: string;
        id_fornecedor: string;
    }>; // lista de produtos
    permissoes?: Array<{ id: string | number; nome: string }>;
}

export default function Entrada(props: EntradaProps) {
    const valorFormatado = props.mascaraMonetaria ? moneyMask(String(props.valor)) : props.valor;

    return (
        <div className={`flex flex-col ${props.className} ${props.metadeLargura ? 'w-1/2' : ''}`}>
            <label className="mb-2">
                {props.texto}
            </label>
            {props.categorias && (
                <select
                    value={String(valorFormatado)}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className="border-2 border-pink-200 rounded-lg focus:outline-none bg-gray-50 px-4 py-2"
                >
                    <option value="">Selecione uma categoria</option>
                    {props.categorias.map(categoria => (
                        <option key={categoria.id} value={String(categoria.id)}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
            )}
            {props.permissoes && (
                <select
                    value={String(valorFormatado)}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className="border-2 border-pink-200 rounded-lg focus:outline-none bg-gray-50 px-4 py-2.5"
                >
                    <option value="">Selecione uma permissão</option>
                    {props.permissoes.map(permissao => (
                        <option key={permissao.id} value={String(permissao.id)}>
                            {permissao.nome}
                        </option>
                    ))}
                </select>
            )}
            {props.fornecedores && (
                <select
                    value={String(valorFormatado)}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className="border-2 border-pink-200 rounded-lg focus:outline-none bg-gray-50 px-4 py-2"
                >
                    <option value="">Selecione um fornecedor</option>
                    {props.fornecedores.map(fornecedor => (
                        <option key={fornecedor.id} value={String(fornecedor.id)}>
                            {fornecedor.razao_social}
                        </option>
                    ))}
                </select>
            )}
            {props.produtos && (
                <select
                    value={String(valorFormatado)}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className="border-2 border-pink-200 rounded-lg focus:outline-none bg-gray-50 px-4 py-2"
                >
                    <option value="">Selecione um produto</option>
                    {props.produtos.map(produto => (
                        <option key={produto.id} value={String(produto.id)}>
                            {produto.nome}
                        </option>
                    ))}
                </select>
            )}
            {props.vendedores && (
                <select
                    value={String(valorFormatado)}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className="border-2 border-pink-200 rounded-lg focus:outline-none bg-gray-50 px-4 py-2"
                >
                    <option value="">Selecione um vendedor</option>
                    {props.vendedores.map(vendedor => (
                        <option key={vendedor.id} value={String(vendedor.id)}>
                            {vendedor.nome}
                        </option>
                    ))}
                </select>
            )}
            {!props.categorias && !props.fornecedores && !props.permissoes && !props.produtos && !props.vendedores && (
                <input
                    type={props.tipo === 'number' ? 'text' : props.tipo ?? 'text'}
                    value={valorFormatado !== undefined ? String(valorFormatado) : ''}
                    readOnly={props.somenteLeitura}
                    onChange={e => props.valorMudou?.(e.target.value)}
                    className={`
                  border-2 border-pink-200 rounded-lg
                  focus:outline-none bg-gray-50 px-4 py-2
                  ${props.somenteLeitura ? '' : 'focus:bg-white'}
                `}
                />
            )}
        </div>
    );
}


export const moneyMask = (value: string) => {
    value = value.replace(',', '').replace(/\D/g, '');
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) return '';

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat('pt-BR', options).format(floatValue);
    return 'R$ ' + result;
};
