import { useState } from 'react'
import './Menu.css'

export default function Menu() {
    const [currStructure, setCurrStructure] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrStructure(e.target.value);
    }
    return  (
    <div>
        <div className="menu-container">
            <select id="dropdown" value={currStructure} onChange={handleChange}>
                <option value="">Choose a Data Structure</option>
                <option value="linkedlist">Linked List</option>
                <option value="stack">Stack</option>
            </select>
            {
                currStructure == ""
                ? <div>No structure selected</div>
                : <div>Structure is <span id="structure-text">{currStructure}</span></div>
                
            }
        </div>
    </div>
    );
}
 