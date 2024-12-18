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

    return (
        <>
            {isSelect && <StructureModal setIsSelect={setIsSelect} setStructure={setStructure} />}
            <div className="menu-container">
                <button onClick={handleSelectBtn} className={`button-style1 select-structure-btn`}>Select Structure</button>
                <ControlPanel structure={structure} data={data} setData={setData} />
            </div>
        </>
    );
}

export default Menu;
