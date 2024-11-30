import "./CodeBlock.css";
import { useEffect } from "react";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-c';

interface CodeBlockProps {
    structure: string;
    language: string;
    code: string;
}
function CodeBlock({language, code} : CodeBlockProps) {
    return (
        <div className={'code-container'}>
            <h1>Language Selected: {language}</h1>
            <pre>
                <code>
                    {code}
                </code>
            </pre>
        </div>
    );
}

export default CodeBlock;