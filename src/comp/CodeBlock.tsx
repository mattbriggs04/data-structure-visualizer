import "./CodeBlock.css";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-core";
import "prismjs/themes/prism-tomorrow.css"; // tomorrow night theme
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c"; // C-language support

interface CodeBlockProps {
    language: string;
    code: string;
}
function CodeBlock({language, code} : CodeBlockProps) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <pre>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
    );
}

export default CodeBlock;