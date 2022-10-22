import React from 'react'
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from 'uuid';

export default function PropertyControls({ openStates, setOpenStates, styles, setProperty }) {
    function renderPropertyControls() {
        const openStatesArray = Object.entries(openStates);

        return openStatesArray.map((openState, index) => {
            const key = openState[0];
            const value = openState[1];
            const valueArray = Object.keys(value);
            const controls = valueArray.map((valueKey) => {
                switch (valueKey) {
                    case "backgroundColor":
                    case "color":
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()}>
                                {
                                    <div key={uuidv4()} style={{ backgroundColor: "white", display: "flex", flexDirection: "column", zIndex: "100" }}>
                                        <HexColorPicker color={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e)} />
                                        <button onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>Save</button>
                                    </div>
                                }
                            </div>
                        )
                    case "width":
                    case "height":
                    case "borderRadius":
                    case "padding":
                    case "margin":
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()}>
                                {
                                    <div key={uuidv4()} style={{ backgroundColor: "white", display: "flex", flexDirection: "column", zIndex: "100" }}>
                                        <input type="text" value={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e.target.value)} />
                                        <button onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>Save</button>
                                    </div>
                                }
                            </div>
                        )
                    default:
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()}>
                                {
                                    <div key={uuidv4()} style={{ backgroundColor: "white", display: "flex", flexDirection: "column", zIndex: "100" }}>
                                        <input type="text" value={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e.target.value)} />
                                        <button onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>Save</button>
                                    </div>
                                }
                            </div>
                        )
                }
            })
            return controls
        })
    }

    
    return (
        <div style={{ position: "absolute", zIndex: "50", top: "10%"}}>{renderPropertyControls()}</div>
    )
}
