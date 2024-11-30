import { Dispatch, SetStateAction } from 'react';
import './Menu.css';
import ControlPanel from "./ControlPanel"
import { DataType } from "../types/types"

interface MenuProps {
    structure: string;
    setStructure: Dispatch<SetStateAction<string>>;
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
}

function Menu({ structure, setStructure, data, setData }: MenuProps) {
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStructure(event.target.value);
    };

    return (
        <div className="menu-container">
            <div className={`menu-header`}>
                <h1>Menu</h1>
            </div>
            <select id="dropdown" onChange={handleDropdownChange}>
                <option value="">Choose a Data Structure</option>
                <option value="linkedlist">Linked List</option>
                <option value="stack">Stack</option>
                <option value="binarytree">Binary Search Tree</option>
            </select>
            
            <ControlPanel structure={structure} data={data} setData={setData} />
        </div>

    );
}

export default Menu;
