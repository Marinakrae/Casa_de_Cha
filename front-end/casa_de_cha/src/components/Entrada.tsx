import React from "react";

interface EntradaProps {
    tipo?: 'text' | 'number';
    texto: string;
    valor: string | number;
    somenteLeitura?: boolean;
    className?: string;
    valorMudou?: (valor: any) => void;
    metadeLargura?: boolean;
    mascaraMonetaria?: boolean;
    categorias?: Array<{ id: string | number; nome: string; ativo: boolean }>; // lista de categorias
    fornecedores?: Array<{ id: string | number; razao_social: string; cnpj: number, telefone: number, ativo: boolean }>; // lista de fornecedores
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
            {!props.categorias && !props.fornecedores && (
                <input
                    type={props.tipo ?? 'text'}
                    value={String(valorFormatado)}
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
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    )

    return 'R$ ' + result;
}
