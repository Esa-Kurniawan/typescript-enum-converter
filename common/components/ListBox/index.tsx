import clsx from "clsx";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { MdOutlineCheck, MdOutlineUnfoldMore } from "react-icons/md";

import { Listbox } from "@headlessui/react";

import { DataType, KeyOrValue, Language } from "common/types";

interface ListBoxProps<T> {
    selectedItem: T;
    items: T[];
    placement?: "top" | "bottom";
    width: string;
    onChange: (value: T) => void;
}

const listBoxVariants: Variants = {
    closed: {
        height: 0,
        opacity: 0,
    },
    open: {
        height: "auto",
        opacity: 1,
    },
};

const ListBox = <T extends KeyOrValue | Language | DataType | string>({
    selectedItem,
    items,
    width,
    placement = "bottom",
    onChange,
}: ListBoxProps<T>) => {
    return (
        <div
            style={{
                width,
                position: "relative",
            }}
        >
            <Listbox value={selectedItem} onChange={onChange}>
                {({ open }) => (
                    <>
                        <Listbox.Button className="relative focus:border-blue focus-within:border-blue text-sm font-medium focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 w-full cursor-pointer rounded-lg bg-slate-800 border border-slate-700 py-2 pl-3 pr-10 text-left shadow-md">
                            <span className="block truncate capitalize text-slate-300">
                                {selectedItem}
                            </span>
                            <span className="absolute group inset-y-0 right-0 flex items-center pr-2">
                                <MdOutlineUnfoldMore
                                    className="group-hover:text-slate-500 hover-transition"
                                    size={18}
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    variants={listBoxVariants}
                                    initial="closed"
                                    animate="open"
                                    transition={{
                                        stiffness: 100,
                                    }}
                                    exit="closed"
                                    className={clsx(
                                        "absolute max-h-60 w-full z-40 overflow-auto rounded-lg bg-slate-700 backdrop-blur-sm shadow-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                                        {
                                            "top-11": placement === "bottom",
                                            "bottom-11": placement === "top",
                                        }
                                    )}
                                >
                                    <Listbox.Options
                                        className="divide-y divide-slate-600"
                                        static
                                    >
                                        {items.map((item, itemIndex) => (
                                            <Listbox.Option
                                                key={itemIndex}
                                                className={({ active }) =>
                                                    clsx(
                                                        "relative cursor-pointer text-sm font-medium select-none text-left py-2 pl-10 pr-2",
                                                        {
                                                            "bg-blue text-slate-200":
                                                                active,
                                                            "text-slate-300":
                                                                !active,
                                                        }
                                                    )
                                                }
                                                value={item}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className="truncate capitalize">
                                                            {item}
                                                        </span>
                                                        {selected && (
                                                            <span className="absolute inset-y-0 left-0 w-10 grid place-items-center">
                                                                <MdOutlineCheck
                                                                    className="text-blue"
                                                                    aria-hidden="true"
                                                                    size={18}
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Listbox>
        </div>
    );
};

export default ListBox;
