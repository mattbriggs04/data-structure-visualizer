import { Dispatch, SetStateAction, useState } from 'react';
import './Menu.css';
import ControlPanel from "./ControlPanel"
import StructureModal from "./StructureModal"
import { DataType } from "../types/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

interface MenuProps {
    structure: string;
    setStructure: Dispatch<SetStateAction<string>>;
    data: DataType<number>;
    setData: Dispatch<SetStateAction<DataType<number>>>;
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

function Menu({ structure, setStructure, data, setData, theme, setTheme }: MenuProps) {
    const [isSelect, setIsSelect] = useState(false);
    const handleSelectBtn = () => {
        setIsSelect(true);
    }

    const handleThemeChange = () => {
        setTheme(theme == "light" ? "dark" : "light");
    }

    return (
        <>
            {isSelect && <StructureModal setIsSelect={setIsSelect} setStructure={setStructure} />}
            <div className="menu-container">
                <div>
                    <button onClick={handleThemeChange} className={`theme-select-btn`}>
                        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
                    </button>
                    <button onClick={handleSelectBtn} className={`button-style1 select-structure-btn`}>Select Structure</button>
                </div>
                <ControlPanel structure={structure} data={data} setData={setData} />
            </div>
        </>
    );
}

export default Menu;
