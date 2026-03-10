import { Dispatch, SetStateAction } from 'react';
import './Menu.css';
import { StructureType, structureLabels } from "../types/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

interface MenuProps {
    structure: StructureType;
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
    onOpenStructureModal: () => void;
}

function Menu({ structure, theme, setTheme, onOpenStructureModal }: MenuProps) {
    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const currentStructure = structure === '' ? 'No structure selected' : structureLabels[structure];

    return (
        <header className="menu-container">
            <div className="menu-brand">
                <p className="menu-kicker">Interactive Playground</p>
                <div className="menu-copy">
                    <p className="menu-title">Data Structure Visualizer</p>
                    <p className="menu-description">
                        {structure === ''
                            ? 'Choose a structure to start exploring animations and controls.'
                            : `Working with ${currentStructure}. Switch structures at any time.`}
                    </p>
                </div>
            </div>
            <div className="menu-actions">
                <div className="menu-selection" aria-live="polite">
                    <span>Current</span>
                    <strong>{currentStructure}</strong>
                </div>
                <button
                    type="button"
                    onClick={onOpenStructureModal}
                    className="button-style1 select-structure-btn"
                >
                    {structure === '' ? 'Select Structure' : 'Change Structure'}
                </button>
                <button
                    type="button"
                    onClick={handleThemeChange}
                    className="theme-select-btn"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
                    <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </header>
    );
}

export default Menu;
