import { Dispatch, SetStateAction, useState } from 'react';
import './Menu.css';
import ControlPanel from "./ControlPanel"
import StructureModal from "./StructureModal"
import { DataType } from "../types/types"

interface MenuProps {
    structure: string;
    setStructure: Dispatch<SetStateAction<string>>;
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
}

function Menu({ structure, setStructure, data, setData }: MenuProps) {
    const [isSelect, setIsSelect] = useState(false);
    const handleSelectBtn = () => {
        setIsSelect(true);
    }
    // const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setStructure(event.currentTarget.value);
    // };

    return (
        <div className="menu-container">
            <button onClick={handleSelectBtn}>Select Structure</button>
            {isSelect && <StructureModal setIsSelect={setIsSelect} setStructure={setStructure} />}
            {/* <select id="dropdown" onChange={handleDropdownChange}>
                <option value="">Choose a Data Structure</option>
                <option value="linkedlist">Linked List</option>
                <option value="stack">Stack</option>
                <option value="bst">Binary Search Tree</option>
            </select> */}
            
            <ControlPanel structure={structure} data={data} setData={setData} />
        </div>

    );
}

export default Menu;
