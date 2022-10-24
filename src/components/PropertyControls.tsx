import React, { useMemo } from 'react'
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from 'uuid';
import ReactSlider from 'react-slider'

export default function PropertyControls({ openStates, setOpenStates, styles, setProperty }) {
    const controls = useMemo(() => {
        function renderPropertyControls() {
            console.log("rendering property controls");

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
                                        <div key={uuidv4()} style={{ display: "flex", flexDirection: "column", zIndex: "100", width: "300px" }}>
                                            {/* <input type="text" value={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e.target.value)} /> */}
                                            {/* <ReactSlider onChange={(e) => setProperty(key, valueKey, e.target.value)}  defaultValue={0} /> */}
                                            <ReactSlider
                                                className="horizontal-slider"
                                                thumbClassName="horizontal-slider-thumb"
                                                trackClassName="horizontal-slider-track"
                                                min={300}
                                                max={1000}
                                                onChange={(e) => setProperty(key, valueKey, e)}
                                                renderThumb={(props, state) => <div {...props}></div>}
                                            />
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
        return renderPropertyControls()
    }, [openStates])

    function renderCurrentValue() {
        return Object.entries(openStates).map((openState, index) => {
            const key = openState[0];
            const value = openState[1];
            const valueArray = Object.keys(value);
            const controls = valueArray.map((valueKey) => {
                switch (valueKey) {
                    case "backgroundColor":
                    case "color":
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()} style={{ backgroundColor: styles[key][valueKey], width: "100%", height: "100%" }}></div>
                        )
                    case "width":
                    case "height":
                    case "borderRadius":
                    case "padding":
                    case "margin":
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()}>{styles[key][valueKey]}px</div>
                        )
                    default:
                        return (
                            openStates[key][valueKey] && <div key={uuidv4()} style={{ width: "100%", height: "100%" }}>{styles[key][valueKey]}</div>
                        )
                }
            })
            return controls
        })
    }


    return (
        <div style={{ position: "absolute", zIndex: "50", top: "10%", display: "flex", flexDirection: "column", alignItems: "center" }}>{renderCurrentValue()}{controls}</div>
    )
}
