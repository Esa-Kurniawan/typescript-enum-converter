import create, { StateCreator, SetState, StoreApi, GetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Language } from "common/types";

interface LanguageStore {
    defaultLanguage: Language;
    languages: Language[];
    changeDefaultLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
    devtools(
        persist(
            (set) => ({
                defaultLanguage: Language.JSON,
                languages: Object.values(Language),
                changeDefaultLanguage: (language) => {
                    set(() => ({
                        defaultLanguage: language,
                    }));
                },
            }),
            {
                name: "language-store",
            }
        )
    )
);
