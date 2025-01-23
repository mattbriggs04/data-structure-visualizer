import './Description.css'

interface DescriptionProps {
    structure: string;
}
function Description({structure}: DescriptionProps) {
    return (
        <>
            {structure == "linkedlist" &&
                <div className="linkedlist-desc-container">

                </div>
            }
            {structure == "bst" &&
                <div className="bst-desc-container">
                    <h2>What is a Binary Search Tree?</h2>
                    <p>A Binary Search Tree (BST) is a basic and common data structure that is derived from a Binary Tree. "Bi" refers to two, as each node has zero, one, or two children. A useful way to think about a binary tree is that each node always has two children, but children can be NULL. A BST has the specific property that the left child must have a value less than its parent, while a right child must have a value larger than its parent. A BST's ordering property makes it efficient at searching, inserting, and deleting.</p>
                    <h3>Searching</h3>
                    <p>A BST search can be summarized in a few steps
                        <ul>
                            <li>Start at the root of current tree (if implemented recursively, this may be a subtree)</li>
                            <li>If the target value is smaller than the current node, move to the left subtree</li>
                            <li>If the target value is larger than the current node, move to the right subtree</li>
                            <li>Repeat until either the value is found, or a NULL node is reached (value not found)</li>
                        </ul>
                        Searching can be implemented recursively or by using a stack (see Stack). {/*might want to link to the stack data structure*/}
                    </p>
                    <h3>Insertion</h3>
                    <h3>Deletion</h3>
                    <h3>Disadvantages</h3>
                    <p>A BST does have one major difference. Consider inserting the following values (try it yourself!): 10, 8, 5, 3, 2, 1</p>
                    <p>See the code below for an example of how a general purpose BST would be implemented</p>
                    {/* Code Block Here */}
                    
                </div>
            }
        </>
    )
}

export default Description;