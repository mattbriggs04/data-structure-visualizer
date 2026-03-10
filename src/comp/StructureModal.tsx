import { Dispatch, MouseEvent, SetStateAction } from 'react';
import "./StructureModal.css"
import { StructureType, structureLabels } from '../types/types';

interface StructureModalProps {
    onClose: () => void;
    setStructure: Dispatch<SetStateAction<StructureType>>;
}

const structureSummaries: Record<Exclude<StructureType, ''>, string> = {
    linkedlist: 'Linear nodes connected by pointers.',
    stack: 'LIFO operations with a clear top element.',
    bst: 'Ordered binary tree with insert and delete paths.',
    avl: 'Self-balancing search tree with rotations.',
    minheap: 'Priority queue view with the smallest root.',
    maxheap: 'Priority queue view with the largest root.',
    graph: 'Connected nodes with traversal animations.',
};

function StructureModal({onClose, setStructure} : StructureModalProps) {
    const handleBtnChange = (e: MouseEvent<HTMLButtonElement>) => {
        setStructure(e.currentTarget.value as StructureType)
        onClose();
    }

    const structures: Exclude<StructureType, ''>[] = ['linkedlist', 'stack', 'bst', 'avl', 'minheap', 'maxheap', 'graph'];

    return (
        <div className="modal-bg" onClick={(event) => {
            if(event.target === event.currentTarget) {
                onClose();
            }
        }}>
            <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="structure-modal-title">
                <div className="modal-header">
                    <div>
                        <p className="modal-kicker">Choose a Structure</p>
                        <h2 id="structure-modal-title">Pick a visualizer to explore</h2>
                        <p>Each structure opens a tailored command panel and animation view.</p>
                    </div>
                    <button type="button" className="modal-close" onClick={onClose}>Close</button>
                </div>
                <div className="modal-grid">
                    {structures.map((value) => (
                        <button
                            key={value}
                            type="button"
                            value={value}
                            onClick={handleBtnChange}
                            className="modal-option"
                        >
                            <span className="modal-option-label">{structureLabels[value]}</span>
                            <span className="modal-option-summary">{structureSummaries[value]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default StructureModal;
