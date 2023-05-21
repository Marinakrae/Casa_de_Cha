import Titulo from "./Titulo";

//Interface para especificar as propriedades que o componente recebe
interface LayoutProps {
    titulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3
            bg-white text-amber-950 rounded-md
            font-serif
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}