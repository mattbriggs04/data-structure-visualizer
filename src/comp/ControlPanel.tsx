import './ControlPanel.css';
import { DataType } from '../types/types.ts'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface ControlPanelProps<T> {
    structure: string;
    data: DataType<T>;
    setData: Dispatch<SetStateAction<DataType<T>>>;
}

function ControlPanel({structure, data, setData} : ControlPanelProps<number>) {
    const [input, setInput] = useState(''); // Input from user from ANY given text field (handling depends on which button is pressed)
    const [secondInput, setSecondInput] = useState(''); // Another input field, used primarily for when something may include a pair of inputs like heaps
    const [inputError, setInputError] = useState(false); // If input is valid, store the state and update styles accordingly

    // Reset input whenever structure is updated
    useEffect(() => {
        setInput('');
    }, [structure]);

    // Force a data update (yeah this updates everything rather than just a single obj within data, but are we really concerned about efficieny here? this is TS.)
    const forceUpdate = () => {
        setData({ ...data });
    }

    const handleLinkedListSubmit = () => {
        // let isValidListRe = new RegExp(/^\[\s*((\d+\s*,\s*)*\d+\s*)?\]$/);
        try {
            setData({ ...data, "linkedlist": JSON.parse(input) });
            setInputError(false);
        }
        catch(error) {
            console.log("Error: invalid linked list input given.");
            console.log(error);
            setInputError(true);
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondInput(e.target.value);
    }
    const handleBSTInsert = () => {
        // quick parser for doing multiple inserts in a row
        if(input[0] == '[') {
            try {
                const tree_arr = JSON.parse(input);
                tree_arr.forEach((num: number) => data['bst'].insert(num));
                setData({ ...data });
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
            }
        }
        else {
            const val = Number(input);
            // 0 is disabled because it breaks the tree structure since it will register the parent value as being null
            // may be worth to fix eventually
            if(isNaN(val)) { 
                setInputError(true);
            }
            else {
                try {
                    data['bst'].insert(val);
                    console.log(`BST inserting ${val}`)
                    setData({ ...data });
                    setInputError(false);
                }
                catch(error) {
                    console.log(error);
                    setInputError(true);
                }
            }
        }
    }

    const handleBSTDelete = () => {
        const val = Number(input);
        if(isNaN(val)) {
            setInputError(true);
        }
        else {
            try {
                console.log(`BST deleting ${val}`)
                data['bst'].delete(val);
                forceUpdate();
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
            }
        }
    }

    const handleStackPush = () => {
        const val = Number(input);
        if(isNaN(val)) {
            setInputError(true);
        }
        else {
            setInputError(false);
            data['stack'].push(val);
            forceUpdate();
        }
    }

    const handleStackPop = () => {
        const val = Number(input);
        if(isNaN(val)) {
            setInputError(true);
        }
        else {
            setInputError(false);
            data['stack'].pop();
            forceUpdate();
        }
    }
    const handleAVLInsert = () => {
        // quick parser for putting multiple insertions in array form
        if(input[0] == '[') {
            try {
                const tree_arr = JSON.parse(input);
                tree_arr.forEach((num: number) => data['avl'].insert(num));
                setData({ ...data });
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
            }
        }
        else {
            const val = Number(input);
            // 0 is disabled because it breaks the tree structure since it will register the parent value as being null
            // may be worth to fix eventually
            if(isNaN(val)) { 
                setInputError(true);
            }
            else {
                try {
                    data['avl'].insert(val);
                    console.log(`AVL inserting ${val}`)
                    setData({ ...data });
                    setInputError(false);
                }
                catch(error) {
                    console.log(error);
                    setInputError(true);
                }
            }
        }
    }

    const handleAVLDelete = () => {
        const val = Number(input);
        if(isNaN(val)) {
            setInputError(true);
        }
        else {
            try {
                console.log(`deleting ${val}`)
                data['avl'].delete(val);
                forceUpdate();
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
            }
        }
    }

    const handleHeapInsert = () => {
        const val = Number(input);
        const txt = String(secondInput)
        // insert depending on which heap is selected
        structure == "minheap" ? data['minheap'].insert(val, txt) : data['maxheap'].insert(val, txt);
        forceUpdate();
    }
    const handleHeapExtract = () => {
        structure == "minheap" ? data['minheap'].extract() : data['maxheap'].extract();
        forceUpdate();
    }
    return (
        <div className={`controlpanel-container`}>
            { // potential TODO: Convert all control panels into separate components
                structure == "linkedlist" &&
                <div className={`controlpanel-linkedlist ${inputError && "text-error"}`}>
                    <input type="text" id="linkedlist-input" name="linkedlist" placeholder="ex: [0, 1, 2]" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleLinkedListSubmit();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleInputChange} />
                    <button type="submit" onClick={handleLinkedListSubmit}> Apply Changes </button>
                </div>
            }
            {
                structure == "bst" &&
                <div className={`controlpanel-bst ${inputError && "text-error"}`}>
                    <input type="text" id="bst_input" name="bst_input" placeholder="ex: 10" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleBSTInsert();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleInputChange} />
                    <button type="submit" id="bst-insert-btn" onClick={handleBSTInsert}>Insert</button>
                    <button type="submit" id="bst-delete-btn" onClick={handleBSTDelete}>Delete</button>
                </div>
            }
            {
                structure == "stack" &&
                <div className={`controlpanel-stack ${inputError && "text-error"}`}>
                    <input type="text" id="stack_input" name="stack_input" placeholder="ex: 10" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleStackPush();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleInputChange} />
                    <button type="submit" id="stack-push-btn" onClick={handleStackPush}>Push</button>
                    <button type="submit" id="stack-pop-btn" onClick={handleStackPop}>Pop [<span id="stack-last-popped">{data['stack'].lastPopped}</span>]</button>
                </div>
            }
            {
                structure == "avl" && // identical to bst (but may be changed in the future, so im keeping them separate for now)
                <div className={`controlpanel-avl ${inputError && "text-error"}`}>
                    <input type="text" id="avl-input" name="avl-input" placeholder="ex: 10" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleAVLInsert();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleInputChange} 
                    />
                    <button type="submit" id="avl-insert-btn" onClick={handleAVLInsert}>Insert</button>
                    <button type="submit" id="avl-delete-btn" onClick={handleAVLDelete}>Delete</button>
                </div>
            }
            {
                (structure == "minheap" || structure == "maxheap") &&
                <div className={`controlpanel-heap ${inputError && "text-error"}`}>
                    <input type="text" id="heap-input-text" name="heap-input-text" placeholder="id" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleHeapInsert();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleSecondInputChange} />
                    <input type="text" id="heap-input" name="heap-input" placeholder="weight" defaultValue='' 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                handleHeapInsert();
                                e.currentTarget.value = "";
                            }
                        }} 
                        onChange={handleInputChange} />
                    <button type="submit" id="heap-insert-btn" onClick={handleHeapInsert}>Insert</button>
                    <button type="submit" id="heap-extract-btn" onClick={handleHeapExtract}>Extract [<span id="heap-last-extracted">{structure == "minheap" ? data["minheap"].lastExtracted : data["maxheap"].lastExtracted}</span>]</button>
                </div>
            }
        </div>
    );
}

export default ControlPanel;