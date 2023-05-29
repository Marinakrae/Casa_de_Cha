import Titulo from "./Titulo";

interface LayoutProps {
    titulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col
            bg-pink-50 text-amber-950 rounded-md
            font-serif
            w-full sm:w-2/3 mt-24
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}
