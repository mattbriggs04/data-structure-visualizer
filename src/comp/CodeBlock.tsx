import "./CodeBlock.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from "react";
interface CodeBlockProps {
    language: string;
    filepath: string;
}
function CodeBlock({language, filepath} : CodeBlockProps) {
    const [code, setCode] = useState(``);
    useEffect(() => {
        fetch(filepath)
            .then((res) => res.text())
            .then((text) => {
                setCode(text);
            })
            .catch((err) => console.error("Unable to load code file!", err));
    }, [filepath])

    return (
        <SyntaxHighlighter language={language} style={monokai}>
            {code}
        </SyntaxHighlighter> 
    );
}

export default CodeBlock;