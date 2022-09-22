import Editor from "@monaco-editor/react";
import { NextPage } from "next";

const Test: NextPage = () => {
    return (
        <div>
            <Editor
                language="typescript"
                options={{
                    formatOnPaste: true,
                }}
                height="90vh"
            />
        </div>
    );
};
export default Test;
