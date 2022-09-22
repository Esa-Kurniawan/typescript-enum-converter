interface ButtonPrimaryProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}

const ButtonPrimary = ({ onClick, text }: ButtonPrimaryProps) => {
    return (
        <button
            className="bg-blue hover-transition hover:bg-dark-blue hover:text-slate-300 rounded-lg py-2 px-3 text-sm font-semibold text-slate-200"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonPrimary;
