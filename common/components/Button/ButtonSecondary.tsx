interface ButtonSecondaryProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}

const ButtonSecondary = ({ onClick, text }: ButtonSecondaryProps) => {
    return (
        <button className="" onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonSecondary;
