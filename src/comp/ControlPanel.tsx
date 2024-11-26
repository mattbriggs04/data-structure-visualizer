import './ControlPanel.css';
import { DataType } from '../types/types.ts'
import { useState, Dispatch, SetStateAction } from 'react';

interface ControlPanelProps {
    structure: string;
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
}

function ControlPanel({structure, data, setData} : ControlPanelProps) {
    const [input, setInput] = useState('');
    const [inputError, setInputError] = useState(false);

    const handleSubmitBtn = () => {
        console.log(`submit button pressed, inputError = ${inputError}`);
        if(true /* TODO: add regex to check if it is right */) {
            try {
                setData({ ...data, "linkedlist": JSON.parse(input) });
                setInputError(false);
            }
            catch(error) {
                console.log(error);
                setInputError(true);
            }
            
        }
        else {
            setInputError(true);
        }
    }
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    return (
        <div className={`controlpanel-container`}>
            {
                structure 
                ? <div> Current structure is {structure} </div>
                :  <div> No structure selected </div>
            }
            {
                structure == "linkedlist" &&
                <div className={`controlpanel-linkedlist ${inputError ? "text-error" : "not-error"}`}>
                    <input type="text" id="linkedlist" name="linkedlist" placeholder="ex: [0, 1, 2]" defaultValue='' onChange={handleDataChange} />
                    <button type="submit" onClick={handleSubmitBtn}> Apply Changes </button>
                </div>
            }
        </div>
    );
}

export default ControlPanel;