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
                    <p>
                    Linked lists are commonly used to create other fundamental data structures, such as a stack or queue. The "competition" to linked lists are arrays, which is what they are often compared to when making design decisions and considering the advantages and disadvantages. Much of the time, a linked list solution can also be replicated with an array, and vice versa. Understanding which one to use by weighing their pros and cons given a situation is an essential skill when working with data structures.</p>
                    <h3>Advantages</h3>
                    <ul>
                        <li>Dynamically Sized. Easy to create and add a new node or remove a node already in the list. In contrast, an array's entire structure would have to be resized to add more elements (in C, this could be done using <em>realloc</em> ).</li>
                        <li>Efficient insertion and deletion. Elements don't need to be moved around, just the links updated.</li>
                    </ul>
                    <h3>Disadvantages</h3>
                    <ul>
                        <li>No random access / indexing: while an array can access its fifth element with arr[5], a linked list would require a traversal of five links.
                        </li>
                        <li>Memory overhead: Each node requires additional space to store the next pointer (the link).</li>
                    </ul>
                    <h3>C Code Implementation</h3>
                    <CodeBlock language="c" filepath="/code_examples/C/linkedlist.c" />
                    <h3>Linked Lists Variants</h3>
                    <p>This data structure visualizer (currently) only shows a singly linked list, where the links point to the next node. This does not always have to be the case. As seen in the C Code Implementation, a link is defined by a <strong>next</strong> pointer. These next pointers can store any other link. In fact, multiple pointers can be stored in the ListNode struct! Let's say we wanted to also store a pointer going backwards, to the previous node. We can! It would just require defining a prev pointer after the next pointer. This is known as a <strong>doubly linked list</strong>. Some common linked lists variants are:</p>
                    <ol>
                        <li>Singly Linked List</li>
                        <ul>
                            <li>Simplest linked list.</li>
                            <li>Each node contains data and a pointer to the next node.</li>
                            <li>Pros: Easy, memory efficient.</li>
                            <li>Cons: No backward traversal.</li>
                        </ul>
                        <li>Doubly Linked List</li>
                        <ul>
                            <li>Each node contains data, a pointer to the next node, and a pointer to the previous node.</li>
                            <li>Pros: Easier to delete nodes (given a node, not its data), supports backwards traversal.</li>
                            <li>Cons: More memory overhead, may be more complex to manage pointers.</li>
                        </ul>
                        <li>Circularly Linked Lists</li>
                        <ul>
                            <li>A linked list where the last node points back to the first node, forming a loop.</li>
                            <li>Can be singly or doubly linked.</li>
                            <li>Pros: Useful for cyclic traversal applications.</li>
                            <li>Cons: Risk of infinite loops.</li>
                        </ul>
                    </ol>
                </div>
            }
            {structure == "bst" &&
                <div className="description-container bst-desc-container">
                    <h1>What is a Binary Search Tree?</h1>
                    <p>A <b>Binary Search Tree</b> (BST) is a common data structure that is derived from a Binary Tree. BST's have properties that make them efficient in storing data.

                    <blockquote>But first: what is a Binary Tree? A tree is a hierarchical data structure consisting of nodes that are connected to eachother. Nodes store data and links to their "children". In the case of a Binary Tree -- "Bi" meaning two -- each node has zero, one, or two children. A useful way to think about a Binary Tree is that each node always has two children, but children can be <em>NULL</em>.</blockquote>

                    A Binary Search Tree is a Binary Tree with the following ordering property: for any given node, a node's left child must have a weight less than its parent's weight and the node's right child must have a weight more than its parent's weight. When using the visualizer, notice that this is always true.

                    <blockquote>What about if the parent value is equal? It's a design choice: either discard and do nothing (only allowing unique values), go to the left, or go to the right. Whichever choice is made must be kept consistent with the rest of the program.</blockquote>

                    A BST's ordering property makes it efficient at searching, inserting, and deleting.</p>
                    <h3>Searching</h3>
                    <p>Consider searching for an element with value <em>target</em>.
                        <ol>
                            <li>Start at the root of current tree (the top node).</li>
                            <li>Compare the target value to the current node value.</li>
                            <ul>
                                <li>If it's smaller, move left.</li>
                                <li>If it's larger, move right.</li>
                                <li>If it matches, the node has been found! Return.</li>
                            </ul>
                            <li>Repeat until either the target is found, or a NULL node is reached (the target is not in the tree).</li>
                        </ol>
                        Searching can be implemented recursively -- where each step calls the function on a smaller subtree -- or iteratively using a loop and pointer. The code segment below demonstrates an iterative approach.
                    </p>
                    <h3>Insertion</h3>
                    <p>Insertion follows similarly to searching:
                    <ol>
                        <li>Exactly matching how searching works, compare the target value to the current node. Smaller goes left, larger goes right. As discussed in the note in the introduction, the equality case is a design choice.</li>
                        <li>Once a NULL node is found, replace it with the new node. For example, if a tree has only a 10, then inserting a 7 would check the left node of the 10, see it is NULL, and place the 7 to the left of 10.</li>
                    </ol>
                    </p>
                    <h3>Deletion</h3>
                    <p>Deletion gets a little bit more complex. First, search for the node. Once the desired node has been reached, there are three main cases to consider:
                    <ol>
                        <li><strong>No children</strong>: Simply remove the node.</li>
                        <li><strong>One child</strong>: Replace the node with its child.</li>
                        <li><strong>Two children</strong>: Unfortunately, you cannot just delete the node or randomly replace the node with one of its children. Instead:</li>
                        <ul>
                            <li>Find the inorder successor, which is the smallest value in the right subtree. This can be found by traversing once to the right, then left as far as possible. Then, Copy the successor value into the target node, then delete the successor. Since we have gone left as far as possible, we know the successor node does not have a left child, thus it will be replaced by the right child.</li>
                            <li>This works because the inorder successor is the next largest value, so by replacing the node with it, the left child must still be smaller and the right still larger.</li>
                            <li>Alternatively, the inorder predecessor also works (go left, then right as far as possible).</li>
                        </ul>
                    </ol>
                    It is highly encouraged to test all three deletion cases using the visualizer: see if you can predict what the tree will look like after deletion!
                    </p>
                    <h3>Disadvantages</h3>
                    <p>Consider inserting the following values in the order which they are listed: [10, 8, 5, 3, 2, 1]</p>
                    <p>Since all of the elements are less than the previously inserted one, they form a straight line. In this case, the BST is effectively a Linked List -- the time complexity for inserting and searching is O(n), since every node needed to be checked. This is the Binary Search Tree's worst-case scenario, happening with data that is nearly sorted. <strong>Balanced</strong> BSTs (such as an AVL Tree) fix this issue by rearranging the nodes, enforcing an O(log n) performance. Much better!</p>
                    
                    <h3>Try It Yourself</h3>
                    <p>Below are some trees you may want to insert and see how they differ in structure!</p>
                    <ul>
                        <li>[10, 8, 5, 3, 2, 1] - The worst case scenario from above</li>
                        <li>[5, 3, 8, 6, 1, 10, 2] - A more balanced shape</li>
                        <li>[10, 8, 12, 7, 9, 11] - A complete binary tree: a tree in which all but the last level is filled</li>
                    </ul>
                    <blockquote>
                        <b>Tip:</b> into any tree visualizer, elements can be quickly inserted by putting them in a list format. [10, 8, 5] will insert a 10, then 8, then 5.
                    </blockquote>
                    {/* <p>See the code below for an example of how a general purpose BST would be implemented</p>
                    Code Block Here */}
                    
                </div>
            }
        </div>
    )
}

export default Description;