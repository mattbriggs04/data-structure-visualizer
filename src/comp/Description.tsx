import './Description.css'

interface DescriptionProps {
    structure: string;
}
function Description({structure}: DescriptionProps) {
    return (
        <div className="description-wrapper">
            {structure == "linkedlist" &&
                <div className="description-container linkedlist-desc-container">

                </div>
            }
            {structure == "bst" &&
                <div className="description-container bst-desc-container">
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
                    <p>Consider inserting the following values in the order which they are listed (try it yourself!): [10, 8, 5, 3, 2, 1]. Notice the structure of the BST. In this case, the BST is effectively a Linked List -- the time complexity for inserting and searching is O(n). Thus, the worst-case time complexity for a BST is O(n).</p>
                    <p>See the code below for an example of how a general purpose BST would be implemented</p>
                    {/* Code Block Here */}
                    
                </div>
            }
        </div>
    )
}

export default Description;