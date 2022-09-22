import { NextPage } from "next";
import Head from "next/head";
import MainPage from "screens/main";

const Main: NextPage = () => {
    return (
        <>
            <Head>
                <title>Typescript-enum Converter</title>
            </Head>

            <MainPage />
        </>
    );
};

export default Main;
