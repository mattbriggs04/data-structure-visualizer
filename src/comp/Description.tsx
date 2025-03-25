import './Description.css';
import CodeBlock from './CodeBlock';
interface DescriptionProps {
    structure: string;
}
function Description({structure}: DescriptionProps) {
    return (
        <div className="description-wrapper">
            {structure == "stack" &&
            <div className="description-container stack-desc-container">
                <h1>What is a Stack?</h1>
                <CodeBlock language="c" filepath="/code_examples/C/stack.c" />
            </div>

            }
            {structure == "linkedlist" &&
                <div className="description-container linkedlist-desc-container">
                    <h1>What is a Linked List?</h1>
                    <p>Linked lists are a fundamental data structure that store information in nodes, in which each node is <em>linked</em> to eachother through a pointer to the next and or the previous node.</p> 
                    <blockquote>Currently, the linked list shown in the visualizer is a singly linked list, which means each element contains only a pointer to the next element. A doubly linked list would also include an arrow going backwards, storing both a pointer to the next element and previous element. Note the electrical ground symbol is also used to denote <em>NULL</em> (end of list).</blockquote>
                    Linked lists are commonly used to create other fundamental datastructures, such as a stack or queue. The "competition" to linked lists are arrays, which is what they are often compared to when making design decisions and considering the advantages and disadvantages.
                    <h3>Advantages</h3>
                    <ul>
                        <li>Dynamically Sized. Easy to create and add a new node or remove a node already in the list. In contrast, arrays entire structure have to be resized to add more elements.</li>
                        <li>Efficient insertion and deletion. Elements don't need to be moved around, just the links updated.</li>
                    </ul>
                    <h3>Disadvantages</h3>
                    <ul>
                        <li>No random access / indexing: while in an array to access the fifth element one might type my_arr[5], a linked list would require a traversal along five of the links.
                        </li>
                        <li>Memory overhead: Each node requires additional space to store the next pointer (the link).</li>
                    </ul>
                    <CodeBlock language="c" filepath="/code_examples/C/linkedlist.c" />
                </div>
            }
            {structure == "bst" &&
                <div className="description-container bst-desc-container">
                    <h1>What is a Binary Search Tree?</h1>
                    <p>A <b>Binary Search Tree</b> (BST) is a common data structure that is derived from a Binary Tree. "Bi" meaning two, as each node has zero, one, or two children. A potentially useful way to think about a binary tree is that each node always has two children, but children can be <em>NULL</em>. A BST has the specific property that the left child must have a value less than its parent, while a right child must have a value larger than its parent. 

                    <blockquote>What about if the parent value is equal? It's a design choice: either discard and do nothing (only allowing unique values), go to the left, or go to the right. Whichever choice is made must be kept consistent with the rest of the program.</blockquote>

                    A BST's ordering property makes it efficient at searching, inserting, and deleting.</p>
                    <h3>Searching</h3>
                    <p>A BST search can be summarized in a few steps
                        <ol>
                            <li>Start at the root of current tree (if implemented recursively, this may be a subtree)</li>
                            <li>If the target value is smaller than the current node, move to the left subtree</li>
                            <li>If the target value is larger than the current node, move to the right subtree</li>
                            <li>Repeat until either the value is found, or a NULL node is reached (value not found)</li>
                        </ol>
                        Searching can be implemented recursively or iteratively by using a stack.
                    </p>
                    <h3>Insertion</h3>
                    <p>Insertion follows similarly to searching.</p>
                    <h3>Deletion</h3>
                    <p>Deletion gets a little bit more complex. What happens if we want to delete a node that has two children?</p>
                    <h3>Disadvantages</h3>
                    <p>Consider inserting the following values in the order which they are listed (try it yourself!): [10, 8, 5, 3, 2, 1]. </p>
                    <blockquote>
                        <b>Pro tip:</b> into any tree visualizer, elements can be quickly inserted by putting them in a list format. [10, 8, 5] will insert a 10, then 8, then 5.
                    </blockquote>
                    <p>Notice the structure of the BST -- since all of the elements are less than the previously inserted one, they form a line. In this case, the BST is effectively a Linked List -- the time complexity for inserting and searching is O(n). Thus, the worst-case time complexity for a BST is O(n). With a <em>balanced</em> binary search tree (such as an AVL Tree), the searching and inserting time complexity is O(logn) -- much better!</p>
                    {/* <p>See the code below for an example of how a general purpose BST would be implemented</p>
                    Code Block Here */}
                    
                </div>
            }
        </div>
    )
}

export default Description;