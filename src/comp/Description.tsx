import './Description.css'

interface DescriptionProps {
    structure: string;
}
function Description({structure}: DescriptionProps) {
    return (
        <>
            {structure == "bst" &&
                <div className="bst-desc-container">
                    {/* Code Block Here */}
                    <p>
                        
                    </p>
                </div>
            }
        </>
    )
}

export default Description;