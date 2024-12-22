import './ControlPanel.css';
import { DataType } from '../types/types.ts'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface ControlPanelProps {
    structure: string;
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
}

function ControlPanel({structure, data, setData} : ControlPanelProps) {
    const [input, setInput] = useState(''); // Input from user from ANY given text field (handling depends on which button is pressed)
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
        let isValidListRe = new RegExp(/^\[\s*((\d+\s*,\s*)*\d+\s*)?\]$/);
        if(isValidListRe.test(input)) {
            try {
                setData({ ...data, "linkedlist": JSON.parse(input) });
                setInputError(false);
            }
            catch(error) {
                console.log("Error: invalid input given.");
                console.log(error);
                setInputError(true);
            }
            
        }
        else {
            console.log("Error: invalid input, did not pass regex.")
            setInputError(true);
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleBSTInsert = () => {
        const val = Number(input);
        if(isNaN(val)) {
            setInputError(true);
        }
        else {
            try {
                data['bst'].insert(val);
                console.log(`inserting ${val}`)
                setData({ ...data });
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
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
                console.log(`deleting ${val}`)
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
        }
    }

    const handleStackPop = () => {

    }
    return (
        <div className={`controlpanel-container`}>
            { // potential TODO: Convert all control panels into separate components
                structure == "linkedlist" &&
                <div className={`controlpanel-linkedlist ${inputError && "text-error"}`}>
                    <input type="text" id="linkedlist-input" name="linkedlist" placeholder="ex: [0, 1, 2]" defaultValue='' onChange={handleInputChange} />
                    <button type="submit" onClick={handleLinkedListSubmit}> Apply Changes </button>
                </div>
            }
            {
                structure == "bst" &&
                <div className={`controlpanel-bst ${inputError && "text-error"}`}>
                    <input type="text" id="bst_input" name="bst_input" placeholder="ex: 10" defaultValue='' onChange={handleInputChange}/>
                    <button type="submit" id="bst-insert-btn" onClick={handleBSTInsert}>Insert</button>
                    <button type="submit" id="bst-delete-btn" onClick={handleBSTDelete}>Delete</button>
                </div>
            }
            {
                structure == "stack" &&
                <div className={`controlpanel-stack ${inputError && "text-error"}`}>
                    <input type="text" id="stack_input" name="stack_input" placeholder="ex: 10" defaultValue='' onChange={handleInputChange}/>
                    <button type="submit" onClick={handleStackPush}>Push</button>
                    <button type="submit" onClick={handleStackPop}>Pop</button>
                </div>
            }
        </div>
    );
}

export default ControlPanel;