import { Language } from "common/types";

import Editor, { EditorProps } from "@monaco-editor/react";

interface CodeEditorProps {
    defaultValue?: string;
    value: string;
    onChange: (value: string) => void;
    language: Language;
    options?: EditorProps["options"];
}

const CodeEditor = ({
    defaultValue,
    value,
    onChange,
    language,
    options,
}: CodeEditorProps) => {
    return (
        <div>
            <Editor
                options={options}
                width="100%"
                className="aspect-video rounded-lg"
                theme="vs-dark"
                defaultValue={defaultValue}
                value={value}
                onChange={(value) => onChange(value as string)}
                language={language}
            />
        </div>
    );
};

export default CodeEditor;
