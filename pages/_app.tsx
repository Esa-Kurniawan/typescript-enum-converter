import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }: AppProps) {
    const iconValue: IconContext = {
        className: "text-slate-400",
        size: "24px",
    };

    return (
        <IconContext.Provider value={iconValue}>
            <Component {...pageProps} />
        </IconContext.Provider>
    );
}

export default MyApp;
