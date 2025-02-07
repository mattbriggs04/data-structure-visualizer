import "./CodeBlock.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from "react";
interface CodeBlockProps {
    language: string;
    filepath: string;
}
function CodeBlock({language, filepath} : CodeBlockProps) {
    const [code, setCode] = useState(``);
    const codeStyles = {
        fontSize: "1rem",
        boxShadow: "0 0 8px 1px black",
    }
    useEffect(() => {
        fetch(filepath)
            .then((res) => res.text())
            .then((text) => {
                setCode(text);
            })
            .catch((err) => console.error("Unable to load code file!", err));
    }, [filepath])

    return (
        <SyntaxHighlighter language={language} showLineNumbers={true} style={atomOneDark} customStyle={codeStyles}>
            {code}
        </SyntaxHighlighter> 
    );
}

export default CodeBlock;