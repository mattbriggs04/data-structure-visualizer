
interface ControlPanelProps {
    structure: string;
}

function ControlPanel({structure} : ControlPanelProps) {
    return (
        <div className={`controlpanel-container`}>
            {
                structure 
                ? <div> Current structure is {structure} </div>
                :  <div> No structure selected </div>
            }
            {
                structure == "linkedlist" &&
                <div className={`controlpanel-linkedlist`}>
                    <input type="text" id="linkedlist" name="linkedlist" value="[0, 0]" />
                </div>
            }
        </div>
    );
}

export default ControlPanel;