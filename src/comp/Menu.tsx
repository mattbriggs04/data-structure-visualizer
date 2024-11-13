import { Dispatch, SetStateAction } from 'react';
import './Menu.css';
import ControlPanel from "./ControlPanel"

interface MenuProps {
    structure: string;
    setStructure: Dispatch<SetStateAction<string>>;
}

function Menu({ structure, setStructure }: MenuProps) {
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
                <option value="binarytree">Binary Tree</option>
            </select>
            
            <ControlPanel structure={structure} />
        </div>

    );
}

export default Menu;
