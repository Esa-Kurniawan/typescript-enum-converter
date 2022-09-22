import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { DataType } from "common/types";

interface DataTypeStore {
    defaultDataType: DataType;
    dataTypes: DataType[];
    changeDefaultDataType: (dataType: DataType) => void;
}

export const useDataTypeStore = create<DataTypeStore>()(
    devtools(
        persist(
            (set) => ({
                defaultDataType: DataType.ARRAY_OF_OBJECTS,
                dataTypes: Object.values(DataType),
                changeDefaultDataType: (dataType) => {
                    set(() => ({
                        defaultDataType: dataType,
                    }));
                },
            }),
            { name: "data-type-store" }
        )
    )
);
