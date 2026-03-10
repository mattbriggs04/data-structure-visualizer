import './Description.css';
import CodeBlock from './CodeBlock';
import { StructureType } from '../types/types';

interface DescriptionProps {
    structure: StructureType;
}

function Description({structure}: DescriptionProps) {
    if(structure === '') {
        return null;
    }

    if(structure === 'stack') {
        return (
            <div className="description-wrapper">
                <div className="description-container">
                    <h1>What is a Stack?</h1>
                    <p>A stack is a simple data structure that follows the Last-In, First-Out (LIFO) rule. The most recently inserted element is the first one removed. That small rule makes stacks useful in many places where work needs to be undone, deferred, or revisited in reverse order.</p>
                    <blockquote>
                        The stack in this visualizer grows upward because it reads better on screen. A process call stack in memory is a different concept and may grow in the opposite direction depending on the system.
                    </blockquote>

                    <h2>Core Operations</h2>
                    <ul>
                        <li><strong>Push</strong>: place a new element on top of the stack.</li>
                        <li><strong>Pop</strong>: remove and return the current top element.</li>
                        <li><strong>Peek</strong>: inspect the current top element without removing it.</li>
                    </ul>
                    <p>When a stack is implemented with either a linked list head or a dynamic array tail, all three of those operations are <strong>O(1)</strong>.</p>

                    <h2>Why Stacks Matter</h2>
                    <ul>
                        <li>Function calls naturally nest, so languages often model call state as stack frames.</li>
                        <li>Depth-first search is usually written with an explicit stack or with recursion, which uses the call stack implicitly.</li>
                        <li>Undo and redo systems often keep past actions in one or more stacks.</li>
                    </ul>

                    <h2>C Code Implementation</h2>
                    <p>This project already includes a C example of an array-backed stack. A useful follow-up exercise is writing the same API with a linked list instead.</p>
                    <CodeBlock language="c" filepath="/code_examples/C/stack.c" />
                </div>
            </div>
        );
    }

    if(structure === 'linkedlist') {
        return (
            <div className="description-wrapper">
                <div className="description-container">
                    <h1>What is a Linked List?</h1>
                    <p>A linked list stores data in nodes, and each node stores both a value and a reference to another node. In a singly linked list, each node points only to the next node. The data does not need to live in one contiguous block of memory the way an array does.</p>
                    <blockquote>
                        This visualizer shows a <em>singly</em> linked list. The left-most node is the head, and the ground symbol at the end represents <em>NULL</em>, meaning there is no next node.
                    </blockquote>

                    <h2>Strengths</h2>
                    <ul>
                        <li>Insertion and deletion are cheap once you already have a pointer to the right location.</li>
                        <li>The structure grows naturally one node at a time without copying the whole collection.</li>
                    </ul>

                    <h2>Tradeoffs</h2>
                    <ul>
                        <li>There is no constant-time random access. Reaching the fifth element still requires following four links first.</li>
                        <li>Each node needs extra memory for its pointer fields.</li>
                    </ul>

                    <h2>Common Variants</h2>
                    <ul>
                        <li><strong>Singly linked list</strong>: each node points forward to the next node.</li>
                        <li><strong>Doubly linked list</strong>: each node stores both <em>next</em> and <em>prev</em> links.</li>
                        <li><strong>Circular linked list</strong>: the tail links back to the head instead of ending at <em>NULL</em>.</li>
                    </ul>

                    <h2>Operations in This Visualizer</h2>
                    <ul>
                        <li><strong>Insert</strong>: enter either a single number such as <code>8</code> or an array such as <code>[3, 5, 8]</code>. A single number appends one node at the tail, while an array appends each value in order.</li>
                        <li>Because this visualizer models a singly linked list with only a head reference, appending at the tail usually means walking from the head to the final node first, so insert-at-tail is typically <strong>O(n)</strong>.</li>
                        <li><strong>Remove Head</strong>: drop the first node by moving the head pointer to the next node. That operation is a natural <strong>O(1)</strong> update for a singly linked list.</li>
                    </ul>

                    <h2>Complexity Notes</h2>
                    <p>Searching is <strong>O(n)</strong> because links must be followed one by one. Inserting or deleting at the head is <strong>O(1)</strong>. Inserting or deleting in the middle is also <strong>O(1)</strong> once the predecessor node is already known, but finding that predecessor is still usually <strong>O(n)</strong>.</p>

                    <h2>C Code Implementation</h2>
                    <CodeBlock language="c" filepath="/code_examples/C/linkedlist.c" />
                </div>
            </div>
        );
    }

    if(structure === 'bst') {
        return (
            <div className="description-wrapper">
                <div className="description-container">
                    <h1>What is a Binary Search Tree?</h1>
                    <p>A binary search tree (BST) is a binary tree with an ordering rule: every value in the left subtree is less than or equal to the parent, and every value in the right subtree is greater than the parent. Because the same rule holds recursively at every node, searching can discard half of the remaining tree at each step in a well-shaped tree.</p>
                    <blockquote>
                        In this implementation, duplicate values go to the left. That is a design choice; the important part is staying consistent everywhere in the code.
                    </blockquote>

                    <h2>How Search Works</h2>
                    <ol>
                        <li>Start at the root node.</li>
                        <li>Compare the target value to the current node.</li>
                        <li>If the target is smaller, move left. If it is larger, move right. If it matches, stop.</li>
                        <li>Continue until the value is found or a <em>NULL</em> child is reached.</li>
                    </ol>

                    <h2>Insertion and Deletion</h2>
                    <p>Insertion follows the same comparisons as search until an empty child slot is found. Deletion has three classic cases:</p>
                    <ul>
                        <li><strong>No children</strong>: remove the node directly.</li>
                        <li><strong>One child</strong>: replace the node with its child.</li>
                        <li><strong>Two children</strong>: copy in the inorder successor or predecessor, then remove that replacement node from its original position.</li>
                    </ul>

                    <h2>Performance</h2>
                    <p>Search, insert, and delete are <strong>O(h)</strong>, where <em>h</em> is the tree height. In a balanced tree that is typically <strong>O(log n)</strong>. In the worst case, a BST can become a long chain and degrade to <strong>O(n)</strong>.</p>

                    <h2>Try These Inputs</h2>
                    <ul>
                        <li><code>[10, 8, 5, 3, 2, 1]</code> creates the classic worst-case skew.</li>
                        <li><code>[5, 3, 8, 6, 1, 10, 2]</code> produces a much healthier shape.</li>
                        <li><code>[10, 8, 12, 7, 9, 11]</code> is close to a complete binary tree.</li>
                    </ul>
                </div>
            </div>
        );
    }

    if(structure === 'avl') {
        return (
            <div className="description-wrapper">
                <div className="description-container">
                    <h1>What is an AVL Tree?</h1>
                    <p>An AVL tree is a self-balancing binary search tree. It keeps the same ordering rule as a BST, but after insertion or deletion it checks whether the tree became too heavy on one side. If it did, the tree performs one or two rotations to restore balance.</p>
                    <blockquote>
                        Each node in this visualizer shows its balance factor: <em>height(left subtree) - height(right subtree)</em>. Values near zero are healthy. Magnitudes of two or more mean the node is unbalanced and needs a rotation.
                    </blockquote>

                    <h2>Why Balance Matters</h2>
                    <p>A plain BST can degrade into a linked-list shape if values arrive in an unlucky order. AVL trees actively prevent that by keeping the height close to <strong>O(log n)</strong>, so search, insert, and delete stay efficient.</p>

                    <h2>Rotation Cases</h2>
                    <ul>
                        <li><strong>Left-left</strong>: a single right rotation fixes the imbalance.</li>
                        <li><strong>Right-right</strong>: a single left rotation fixes the imbalance.</li>
                        <li><strong>Left-right</strong>: first rotate the child left, then rotate the parent right.</li>
                        <li><strong>Right-left</strong>: first rotate the child right, then rotate the parent left.</li>
                    </ul>

                    <h2>Operational Costs</h2>
                    <p>Search is still the same conceptual process as a BST. Insert and delete do extra bookkeeping because heights and balance factors need to be updated on the way back up the tree, but the overall complexity remains <strong>O(log n)</strong>.</p>
                </div>
            </div>
        );
    }

    if(structure === 'minheap' || structure === 'maxheap') {
        const title = structure === 'minheap' ? 'What is a Min Heap?' : 'What is a Max Heap?';
        const heapProperty = structure === 'minheap'
            ? 'every parent key is less than or equal to its children'
            : 'every parent key is greater than or equal to its children';
        const rootMeaning = structure === 'minheap'
            ? 'the smallest element is always at the root'
            : 'the largest element is always at the root';

        return (
            <div className="description-wrapper">
                <div className="description-container">
                    <h1>{title}</h1>
                    <p>A heap is a complete binary tree stored efficiently in an array. “Complete” means every level is filled from left to right except possibly the last. The heap property then adds the ordering rule: {heapProperty}, so {rootMeaning}.</p>
                    <blockquote>
                        Heaps are not search trees. They guarantee something strong only at the root and along each parent-child relationship, not across an entire left or right subtree.
                    </blockquote>

                    <h2>Core Operations</h2>
                    <ul>
                        <li><strong>Insert</strong>: append the new value at the next open array slot, then bubble it up until the heap property is restored.</li>
                        <li><strong>Extract</strong>: remove the root, move the last element to the root, then bubble it down.</li>
                        <li><strong>Peek</strong>: inspect the root in <strong>O(1)</strong>.</li>
                    </ul>

                    <h2>Complexity</h2>
                    <p>Insert and extract both take <strong>O(log n)</strong> because the element moves only along one root-to-leaf path. This is why heaps are a classic implementation choice for priority queues.</p>

                    <h2>How This Visualizer Uses Heaps</h2>
                    <p>Each node is displayed as <code>(id, weight)</code>. The weight determines where the node belongs in the heap, while the id is just a label so you can tell repeated priorities apart.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="description-wrapper">
            <div className="description-container">
                <h1>What is a Graph?</h1>
                <p>A graph is a collection of vertices connected by edges. Graphs are a natural way to model roads, computer networks, social relationships, dependency graphs, game maps, and many other systems where “what connects to what” matters more than simple linear order.</p>
                <blockquote>
                    This visualizer uses an <em>undirected</em>, <em>unweighted</em> graph. An edge from A to B means A is connected to B and B is connected to A.
                </blockquote>

                <h2>Common Traversals</h2>
                <ul>
                    <li><strong>Breadth-first search (BFS)</strong>: visits neighbors level by level using a queue. BFS is useful when you care about the shortest path in an unweighted graph.</li>
                    <li><strong>Depth-first search (DFS)</strong>: follows one branch as far as possible before backtracking. DFS is useful for connected components, cycle checks, and many recursive graph problems.</li>
                </ul>

                <h2>Representations</h2>
                <ul>
                    <li><strong>Adjacency list</strong>: each vertex stores the vertices it connects to. This is efficient for sparse graphs.</li>
                    <li><strong>Adjacency matrix</strong>: a 2D table stores whether each pair of vertices is connected. This is often simpler but uses more space.</li>
                </ul>

                <h2>Complexity Notes</h2>
                <p>With an adjacency list, both BFS and DFS run in <strong>O(V + E)</strong>, where <em>V</em> is the number of vertices and <em>E</em> is the number of edges. The traversal animation here highlights the order in which vertices and edges are discovered.</p>
            </div>
        </div>
    );
}

export default Description;
