import Titulo from "./Titulo";

interface LayoutProps {
    titulo: string;
    children?: any;
    className?: string
}

export default function Layout(props: LayoutProps) {
    const { titulo, children } = props;
    const layoutClasses = `
    flex flex-col
    bg-pink-50 text-amber-950 rounded-md
    font-serif
    w-full sm:w-2/3 mt-24
    ${props.className}
  `;

    return (
        <div className={layoutClasses}>
            <Titulo>{titulo}</Titulo>
            <div className="p-6">{children}</div>
        </div>
    );
}
