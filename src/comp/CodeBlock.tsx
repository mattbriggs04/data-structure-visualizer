import "./CodeBlock.css";

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