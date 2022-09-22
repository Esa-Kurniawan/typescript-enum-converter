import React from "react";

interface IconButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactElement;
}

const IconButton = ({ onClick, children }: IconButtonProps) => {
    return (
        <button
            className="p-2 rounded-full hover-transition group hover:bg-slate-800 active:scale-90"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default IconButton;
