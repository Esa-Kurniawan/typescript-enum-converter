import IconButton from "../IconButton";
import React from "react";

interface AppBarProps {
    leftSideIcon: React.ReactElement;
    onLeftSideIconClick: React.MouseEventHandler<HTMLButtonElement>;
    rightSide?: React.ReactNode;
    pageName: string;
}

const AppBar = ({
    rightSide,
    leftSideIcon,
    onLeftSideIconClick,
    pageName,
}: AppBarProps) => {
    return (
        <header className="fixed inset-x-0 top-0 py-2 px-4 shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <IconButton onClick={onLeftSideIconClick}>
                        {leftSideIcon}
                    </IconButton>
                    <span className="font-semibold text-xl font-mono text-slate-400">
                        {pageName}
                    </span>
                </div>

                {rightSide}
            </div>
        </header>
    );
};

export default AppBar;
