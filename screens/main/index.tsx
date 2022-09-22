import CodeEditor from "screens/main/components/CodeEditor";
import { Language, DataType, KeyOrValue } from "common/types";
import { useMap } from "react-use";
import { useLanguageStore, useDataTypeStore } from "setup/store";
import { useState } from "react";
import Combobox from "common/components/ListBox";
import AppBar from "common/components/AppBar";
import { MdOutlineArrowLeft } from "react-icons/md";
import { getArrayInsideOfString } from "./utils";
import { ButtonPrimary } from "common/components/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";

const fadeVariants: Variants = {
    closed: {
        opacity: 0,
    },
    open: {
        opacity: 1,
        transition: {
            delay: 0.5,
        },
    },
};

interface Codes {
    code: string;
    enumCode: string;
    language: Language;
    dataType: DataType;
}

const Main = () => {
    const { defaultLanguage, languages } = useLanguageStore((state) => state);
    const { defaultDataType, dataTypes } = useDataTypeStore((state) => state);

    const [codes, { set: setCodesProperty }] = useMap<Codes>({
        code: "",
        enumCode: "",
        language: defaultLanguage,
        dataType: defaultDataType,
    });

    const [targetProperty, setTargetProperty] = useState<string>("");

    const [keyOrValue, setKeyOrValue] = useState<KeyOrValue>(KeyOrValue.VALUE);

    const handleConvertClick = () => {
        if (
            codes.language === Language.JSON &&
            codes.dataType === DataType.ARRAY_OF_OBJECTS
        ) {
            const array: undefined | any[] = JSON.parse(codes.code);

            if (array === undefined || targetProperty === "") return;

            const convertedToEnum = array.map((item: any) => {
                const enumKey = item[targetProperty]
                    .replaceAll(" ", "_")
                    .toUpperCase();
                return `${enumKey} = "${item[targetProperty]}"`;
            });

            const toDisplayEnum = `export enum Result {
                ${convertedToEnum.toString()}
            }`;

            setCodesProperty("enumCode", toDisplayEnum);
        }

        if (
            codes.language === Language.JSON &&
            codes.dataType === DataType.ARRAY_OF_STRINGS
        ) {
            const array: undefined | string[] = JSON.parse(codes.code);

            if (array === undefined) return;

            const convertedToEnum = array.map((item: any) => {
                const enumKey = item.replaceAll(" ", "_").toUpperCase();
                return `${enumKey} = "${item}"`;
            });

            const toDisplayEnum = `export enum Result {
                ${convertedToEnum}
            }`;

            setCodesProperty("enumCode", toDisplayEnum);
        }

        if (
            codes.language === Language.JSON &&
            codes.dataType === DataType.OBJECT
        ) {
            const object: undefined | Object = JSON.parse(codes.code);

            if (object === undefined) return;

            const convertedToEnum = Object[
                keyOrValue === KeyOrValue.KEY ? "keys" : "values"
            ](object).map((str: string) => {
                const enumKeyOrValue = str.toUpperCase();
                return `${enumKeyOrValue} = "${str}"`;
            });

            const toDisplayEnum = `export enum Result {
                ${convertedToEnum}
            }`;

            setCodesProperty("enumCode", toDisplayEnum);
        }

        // for typescript language
        if (
            codes.language === Language.TYPESCRIPT &&
            codes.dataType === DataType.ARRAY_OF_OBJECTS
        ) {
            const array = getArrayInsideOfString(codes.code);

            if (array === null) return;

            const convertedToEnum = array?.map((item: any) => {
                const enumKey = item[targetProperty]
                    .replaceAll(" ", "_")
                    .toUpperCase();
                return `${enumKey} = "${item[targetProperty]}"`;
            });

            const toDisplayEnum = `export enum Result {
                ${convertedToEnum}
            }`;

            setCodesProperty("enumCode", toDisplayEnum);
        }

        if (
            codes.language === Language.TYPESCRIPT &&
            codes.dataType === DataType.ARRAY_OF_STRINGS
        ) {
            const array = getArrayInsideOfString(codes.code);

            if (array === null) return;

            const convertedToEnum = array.map((item: any) => {
                const enumKey = item.replaceAll(" ", "_").toUpperCase();
                return `${enumKey} = "${item}"`;
            });

            const toDisplayEnum = `export enum Result {
                ${convertedToEnum}
            }`;

            setCodesProperty("enumCode", toDisplayEnum);
        }

        if (
            codes.language === Language.TYPESCRIPT &&
            codes.dataType === DataType.OBJECT
        ) {
        }
    };

    return (
        <>
            <AppBar
                leftSideIcon={<MdOutlineArrowLeft />}
                onLeftSideIconClick={() => null}
                pageName="Converter"
            />

            <main className="mt-24 ">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <div className="flex mb-4 gap-4 items-center">
                                <Combobox
                                    width="7.5rem"
                                    items={languages}
                                    selectedItem={codes.language}
                                    onChange={(language) =>
                                        setCodesProperty("language", language)
                                    }
                                />

                                <Combobox
                                    items={dataTypes}
                                    width="10rem"
                                    selectedItem={codes.dataType}
                                    onChange={(dataType) =>
                                        setCodesProperty("dataType", dataType)
                                    }
                                />

                                <AnimatePresence>
                                    {codes.dataType ===
                                        DataType.ARRAY_OF_OBJECTS && (
                                        <motion.div
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={fadeVariants}
                                        >
                                            <input
                                                className="rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue hover-transition text-sm font-medium text-slate-300 py-2 px-3"
                                                value={targetProperty}
                                                onChange={(e) =>
                                                    setTargetProperty(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {codes.dataType === DataType.OBJECT && (
                                        <motion.div
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={fadeVariants}
                                        >
                                            <Combobox
                                                selectedItem={keyOrValue}
                                                items={Object.values(
                                                    KeyOrValue
                                                )}
                                                width="5.8rem"
                                                onChange={(newKeyOrValue) =>
                                                    setKeyOrValue(newKeyOrValue)
                                                }
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <CodeEditor
                                defaultValue="// enter the code here"
                                language={codes.language}
                                value={codes.code}
                                onChange={(code) =>
                                    setCodesProperty("code", code as string)
                                }
                            />
                        </div>

                        <div>
                            <div className="flex mb-4 justify-end">
                                <ButtonPrimary
                                    text="Convert to enum"
                                    onClick={handleConvertClick}
                                />
                            </div>

                            <CodeEditor
                                onChange={(enumCode) =>
                                    setCodesProperty("enumCode", enumCode)
                                }
                                options={{
                                    formatOnPaste: true,
                                    formatOnType: true,
                                }}
                                value={codes.enumCode}
                                language={Language.TYPESCRIPT}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Main;
