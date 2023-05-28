interface EntradaProps {
    tipo?: 'text' | 'number';
    texto: string;
    valor: any;
    somenteLeitura?: boolean;
    className?: string;
    valorMudou?: (valor: any) => void;
    metadeLargura?: boolean;
}

export default function Entrada(props: EntradaProps) {
    return (
        <div className={`flex flex-col ${props.className} ${props.metadeLargura ? 'w-1/2' : ''}`}>
            <label className="mb-2">
                {props.texto}
            </label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                readOnly={props.somenteLeitura}
                onChange={e => props.valorMudou?.(e.target.value)}
                className={`
                    border-2 border-pink-200 rounded-lg
                    focus:outline-none bg-gray-50 px-4 py-2
                    ${props.somenteLeitura ? '' : 'focus:bg-white'} 
                `}
            />
        </div>
    );
}
