import './ControlPanel.css';
import { useState, useEffect, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import { DataType, StructureType, structureLabels } from '../types/types';

interface ControlPanelProps {
    structure: StructureType;
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
}

interface ControlFieldProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onEnter?: () => void;
    wide?: boolean;
}

const panelDescriptions: Record<Exclude<StructureType, ''>, string> = {
    linkedlist: 'Replace the current list with a JSON array of numbers.',
    bst: 'Insert a single number or an array, then delete individual values.',
    stack: 'Push a value onto the stack or pop the current top element.',
    avl: 'Insert values and watch the tree rebalance itself as needed.',
    minheap: 'Add a labeled node with a weight, or extract the minimum root.',
    maxheap: 'Add a labeled node with a weight, or extract the maximum root.',
    graph: 'Build nodes and edges, then run BFS or DFS from a starting node.',
};

function ControlPanel({structure, data, setData} : ControlPanelProps) {
    const [input, setInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        setInput('');
        setSecondInput('');
        setInputError(false);
    }, [structure]);

    if(structure === '') {
        return null;
    }

    const forceUpdate = () => {
        setData({ ...data });
    }

    const resetInputs = () => {
        setInput('');
        setSecondInput('');
    }

    const handleInputChange = (value: string) => {
        setInput(value);
        if(inputError) {
            setInputError(false);
        }
    }

    const handleSecondInputChange = (value: string) => {
        setSecondInput(value);
        if(inputError) {
            setInputError(false);
        }
    }

    const parseNumberInput = (raw: string): number | null => {
        const value = Number(raw);
        return Number.isNaN(value) ? null : value;
    }

    const parseNumberArrayInput = (raw: string): number[] | null => {
        try {
            const parsed = JSON.parse(raw);
            if(!Array.isArray(parsed)) {
                return null;
            }
            if(!parsed.every((item) => typeof item === 'number')) {
                return null;
            }
            return parsed;
        }
        catch {
            return null;
        }
    }

    const handleLinkedListSubmit = () => {
        const parsed = parseNumberArrayInput(input);
        if(parsed === null) {
            setInputError(true);
            return;
        }

        setData({ ...data, linkedlist: parsed });
        setInputError(false);
        resetInputs();
    }

    const handleBSTInsert = () => {
        if(input.trim().startsWith('[')) {
            const parsed = parseNumberArrayInput(input);
            if(parsed === null) {
                setInputError(true);
                return;
            }

            parsed.forEach((num) => data.bst.insert(num));
            forceUpdate();
            setInputError(false);
            resetInputs();
            return;
        }

        const value = parseNumberInput(input);
        if(value === null) {
            setInputError(true);
            return;
        }

        data.bst.insert(value);
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleBSTDelete = () => {
        const value = parseNumberInput(input);
        if(value === null) {
            setInputError(true);
            return;
        }

        data.bst.delete(value);
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleStackPush = () => {
        const value = parseNumberInput(input);
        if(value === null) {
            setInputError(true);
            return;
        }

        data.stack.push(value);
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleStackPop = () => {
        data.stack.pop();
        forceUpdate();
        setInputError(false);
    }

    const handleAVLInsert = () => {
        if(input.trim().startsWith('[')) {
            const parsed = parseNumberArrayInput(input);
            if(parsed === null) {
                setInputError(true);
                return;
            }

            parsed.forEach((num) => data.avl.insert(num));
            forceUpdate();
            setInputError(false);
            resetInputs();
            return;
        }

        const value = parseNumberInput(input);
        if(value === null) {
            setInputError(true);
            return;
        }

        data.avl.insert(value);
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleAVLDelete = () => {
        const value = parseNumberInput(input);
        if(value === null) {
            setInputError(true);
            return;
        }

        data.avl.delete(value);
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleHeapInsert = () => {
        const weight = parseNumberInput(input);
        const label = secondInput.trim();
        if(weight === null || label.length === 0) {
            setInputError(true);
            return;
        }

        if(structure === 'minheap') {
            data.minheap.insert(weight, label);
        }
        else {
            data.maxheap.insert(weight, label);
        }
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleHeapExtract = () => {
        if(structure === 'minheap') {
            data.minheap.extract();
        }
        else {
            data.maxheap.extract();
        }
        forceUpdate();
        setInputError(false);
    }

    const handleGraphAddNode = () => {
        if(!data.graph.addNode(input)) {
            setInputError(true);
            return;
        }

        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleGraphAddEdge = () => {
        if(!data.graph.addEdge(input, secondInput)) {
            setInputError(true);
            return;
        }

        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleGraphTraverse = (type: 'bfs' | 'dfs') => {
        if(data.graph.traverse(type, input) === null) {
            setInputError(true);
            return;
        }

        forceUpdate();
        setInputError(false);
    }

    const handleGraphLoadExample = () => {
        data.graph.loadExample();
        forceUpdate();
        setInputError(false);
    }

    const handleGraphClear = () => {
        data.graph.clear();
        forceUpdate();
        setInputError(false);
        resetInputs();
    }

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>, onEnter?: () => void) => {
        if(event.key === 'Enter' && onEnter !== undefined) {
            event.preventDefault();
            onEnter();
        }
    }

    const renderField = ({
        id,
        name,
        label,
        placeholder,
        value,
        onChange,
        onEnter,
        wide = false,
    }: ControlFieldProps) => (
        <label className={`control-field ${wide ? 'control-field-wide' : ''}`} htmlFor={id}>
            <span>{label}</span>
            <input
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onKeyDown={(event) => handleEnter(event, onEnter)}
                onChange={(event) => onChange(event.target.value)}
            />
        </label>
    );

    const lastHeapValue = structure === 'minheap' ? data.minheap.lastExtracted : data.maxheap.lastExtracted;

    return (
        <section className={`controlpanel-shell ${inputError ? 'text-error' : ''}`}>
            <div className="controlpanel-heading">
                <div>
                    <p className="controlpanel-kicker">Command Panel</p>
                    <h2>{structureLabels[structure]}</h2>
                    <p className="controlpanel-summary">{panelDescriptions[structure]}</p>
                </div>
            </div>
            <div className="controlpanel-container">
                {
                    structure === 'linkedlist' &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'linkedlist-input',
                            name: 'linkedlist',
                            label: 'Values',
                            placeholder: '[0, 1, 2]',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleLinkedListSubmit,
                            wide: true,
                        })}
                        <div className="control-actions">
                            <button type="button" onClick={handleLinkedListSubmit}>Apply Changes</button>
                        </div>
                    </div>
                }
                {
                    structure === 'bst' &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'bst-input',
                            name: 'bst-input',
                            label: 'Value or Array',
                            placeholder: '10 or [10, 5, 12]',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleBSTInsert,
                            wide: true,
                        })}
                        <div className="control-actions">
                            <button type="button" id="bst-insert-btn" onClick={handleBSTInsert}>Insert</button>
                            <button type="button" id="bst-delete-btn" className="secondary-action" onClick={handleBSTDelete}>Delete</button>
                        </div>
                    </div>
                }
                {
                    structure === 'stack' &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'stack-input',
                            name: 'stack-input',
                            label: 'Value',
                            placeholder: '10',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleStackPush,
                        })}
                        <div className="control-actions">
                            <button type="button" id="stack-push-btn" onClick={handleStackPush}>Push</button>
                            <button type="button" id="stack-pop-btn" className="secondary-action" onClick={handleStackPop}>Pop</button>
                        </div>
                        <div className="controlpanel-stat">
                            <span>Last Popped</span>
                            <strong id="stack-last-popped">{String(data.stack.lastPopped ?? 'None')}</strong>
                        </div>
                    </div>
                }
                {
                    structure === 'avl' &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'avl-input',
                            name: 'avl-input',
                            label: 'Value or Array',
                            placeholder: '10 or [10, 5, 12]',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleAVLInsert,
                            wide: true,
                        })}
                        <div className="control-actions">
                            <button type="button" id="avl-insert-btn" onClick={handleAVLInsert}>Insert</button>
                            <button type="button" id="avl-delete-btn" className="secondary-action" onClick={handleAVLDelete}>Delete</button>
                        </div>
                    </div>
                }
                {
                    (structure === 'minheap' || structure === 'maxheap') &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'heap-input-text',
                            name: 'heap-input-text',
                            label: 'Node ID',
                            placeholder: 'A',
                            value: secondInput,
                            onChange: handleSecondInputChange,
                            onEnter: handleHeapInsert,
                        })}
                        {renderField({
                            id: 'heap-input',
                            name: 'heap-input',
                            label: 'Weight',
                            placeholder: '12',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleHeapInsert,
                        })}
                        <div className="control-actions">
                            <button type="button" id="heap-insert-btn" onClick={handleHeapInsert}>Insert</button>
                            <button type="button" id="heap-extract-btn" className="secondary-action" onClick={handleHeapExtract}>Extract</button>
                        </div>
                        <div className="controlpanel-stat">
                            <span>Last Extracted</span>
                            <strong id="heap-last-extracted">{lastHeapValue ?? 'None'}</strong>
                        </div>
                    </div>
                }
                {
                    structure === 'graph' &&
                    <div className="controlpanel-row">
                        {renderField({
                            id: 'graph-node-input',
                            name: 'graph-node-input',
                            label: 'Node / Start',
                            placeholder: 'A',
                            value: input,
                            onChange: handleInputChange,
                            onEnter: handleGraphAddNode,
                        })}
                        {renderField({
                            id: 'graph-edge-input',
                            name: 'graph-edge-input',
                            label: 'Neighbor',
                            placeholder: 'B',
                            value: secondInput,
                            onChange: handleSecondInputChange,
                        })}
                        <div className="control-actions">
                            <button type="button" onClick={handleGraphAddNode}>Add Node</button>
                            <button type="button" onClick={handleGraphAddEdge}>Add Edge</button>
                            <button type="button" className="secondary-action" onClick={() => handleGraphTraverse('bfs')}>BFS</button>
                            <button type="button" className="secondary-action" onClick={() => handleGraphTraverse('dfs')}>DFS</button>
                            <button type="button" className="secondary-action" onClick={handleGraphLoadExample}>Example</button>
                            <button type="button" className="secondary-action" onClick={handleGraphClear}>Clear</button>
                        </div>
                    </div>
                }
            </div>
            {inputError && (
                <p className="controlpanel-error">
                    Check the expected input format and try again.
                </p>
            )}
        </section>
    );
}

export default ControlPanel;
