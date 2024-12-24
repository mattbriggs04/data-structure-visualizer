import "./CodeBlock.css";

interface CodeBlockProps {
    language: string;
    code: string;
}
function CodeBlock({language, code} : CodeBlockProps) {
    return (
        <div className={'code-container'}>
            <h2>Language Selected: {language}</h2>
            <pre>
                <code>
                    {code}
                </code>
            </pre>
        </div>
    );
}

export default CodeBlock;