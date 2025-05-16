interface ButtonProps {
    text: string;   
    onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button 
        className="border-2 border-lime-500 text-white p-1.5 rounded uppercase font-bold hover:bg-green-200 hover:cursor-pointer px-2 hover:text-black transition duration-300 ease-in-out"
        onClick={onClick}
        >
            {text}
        </button>
    )
}