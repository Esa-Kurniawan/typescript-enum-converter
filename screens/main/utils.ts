// export const getArrayInsideOfString = (text: string): any[] | null => {
//     const regex = new RegExp(/\[.*\]/, "g");
//     const temp = text.match(regex);
//     let arr: any[] = [];
//     try {
//         arr = temp ? JSON.parse(temp) : null;
//     } catch {
//         return null;
//     }
//     const gotAnArray = Array.isArray(arr);
//     return gotAnArray ? arr : null;
// };

export const getArrayInsideOfString = <T extends string | {}>(
    text: string
): T[] | null => {
    const regex = new RegExp(/\[.*\]/, "g");
    const temp = text.match(regex);

    if (Array.isArray(JSON.parse(temp))) {
        return JSON.parse(temp);
    }

    return null;
};
