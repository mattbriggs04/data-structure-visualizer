import { Dispatch, SetStateAction } from 'react';
import "./StructureModal.css"

interface StructureModalProps {
    setIsSelect: Dispatch<SetStateAction<boolean>>;
    setStructure: Dispatch<SetStateAction<string>>;
}
function StructureModal({setIsSelect, setStructure} : StructureModalProps) {
    const handleBtnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setStructure(e.currentTarget.value)
        setIsSelect(false);
    }
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <button value="linkedlist" onClick={handleBtnChange}>Linked List</button>
                <button value="stack" onClick={handleBtnChange}>Stack</button>
                <button value="bst" onClick={handleBtnChange}>Binary Search Tree</button>
                <button value="avl" onClick={handleBtnChange}>AVL Tree</button>
                <button value="minheap" onClick={handleBtnChange}>Min Heap</button>
                <button value="maxheap" onClick={handleBtnChange}>Max Heap</button>
            </div>
        </div>
    );
}


export default StructureModal;