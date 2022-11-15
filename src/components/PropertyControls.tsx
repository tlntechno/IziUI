import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from 'uuid';
import ReactSlider from 'react-slider'
import Draggable from 'react-draggable';
import { TfiSave } from 'react-icons/tfi';

export default function PropertyControls({
    openStates,
    setOpenStates,
    styles,
    styleOptions,
    setProperty,
    initialOpenStates,
}) {
    const nodeRef = useRef(null);
    const handleBlur = useCallback(
        (e) => {
            const currentTarget = e.currentTarget;
            requestAnimationFrame(() => {
                console.log("closing all", Object.keys(openStates).map((key) => Object.values(openStates[key]).includes(true))[0]);
                if (!currentTarget.contains(document.activeElement) && Object.keys(openStates).map((key) => Object.values(openStates[key]).includes(true))[0]) {

                    setOpenStates(initialOpenStates);
                }
            });
        },
        [openStates]
    );

    useEffect(() => {
        const controlContainer = document.getElementById("controlContainer");
        if (controlContainer && controlContainer.children.length > 0) {
            controlContainer.focus();
        }
    }, [openStates])

    const controls = useMemo(() => {
        function renderPropertyControls() {
            const openStatesArray = Object.entries(openStates);
            return openStatesArray.map((openState) => {
                const key = openState[0]; // iziDropdownContainer
                const value = openState[1]; // { backgroundColor: true, ... }
                const valueArray = Object.keys(value);
                const controls = valueArray.map((valueKey) => {
                    if (!styleOptions[key][valueKey]) {
                        return null;
                    }
                    switch (valueKey) {
                        case "backgroundColor":
                        case "color":
                            return (
                                openStates[key][valueKey] &&

                                <>
                                    {/* <Draggable>
                                        <div className="relative flex pt-5 w-[200px] h-[248px] bg-slate-500 rounded-md bg-opacity-80">
                                        </div>
                                    </Draggable> */}
                                    <div key={uuidv4()}
                                        id="propertyControl"
                                        className="bottom-0 flex flex-col">
                                        <HexColorPicker color={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e)} />
                                        <div className='flex justify-end w-full p-3'>
                                            <button
                                                className='flex justify-center items-center w-fit rounded-md p-2 px-3 bg-green-500'
                                                onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>
                                                <TfiSave />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        case "width":
                        case "height":
                        case "borderRadius":
                        case "padding":
                        case "margin":
                            console.log(styles[key][valueKey].replace("px", ""))
                            return (
                                openStates[key][valueKey] && <div key={uuidv4()}>
                                    {
                                        <div key={uuidv4()}
                                            id="propertyControl" style={{ display: "flex", flexDirection: "column", zIndex: "100", width: "300px" }}
                                            className="flex flex-col z-[100] w-52 px-5">
                                            {/* <input type="text" value={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e.target.value)} /> */}
                                            {/* <ReactSlider onChange={(e) => setProperty(key, valueKey, e.target.value)}  defaultValue={0} /> */}
                                            <ReactSlider
                                                className="horizontal-slider cursor-col-resize"
                                                thumbClassName="horizontal-slider-thumb"
                                                trackClassName="horizontal-slider-track"
                                                min={styleOptions[key][valueKey].min}
                                                max={styleOptions[key][valueKey].max}
                                                step={styleOptions[key][valueKey].step}
                                                defaultValue={Number(styles[key][valueKey].replace("px", ""))}
                                                onChange={(e) => setProperty(key, valueKey, e + "px")}
                                                renderThumb={(props, state) => <div {...props}></div>}
                                            />
                                            <div className='flex justify-end w-full p-3'>
                                                <button
                                                    className='flex justify-center items-center w-fit rounded-md p-2 px-3 bg-green-500'
                                                    onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>
                                                    <TfiSave />
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        default:
                            return (
                                openStates[key][valueKey] && <div key={uuidv4()}>
                                    {
                                        <div key={uuidv4()} id="propertyControl" style={{ backgroundColor: "white", display: "flex", flexDirection: "column", zIndex: "100" }}>
                                            <input type="text" value={styles[key][valueKey]} onChange={(e) => setProperty(key, valueKey, e.target.value)} />
                                            <div className='flex justify-end w-full p-3'>
                                                <button
                                                    className='flex justify-center items-center w-fit rounded-md p-2 px-3 bg-green-500'
                                                    onClick={() => setOpenStates({ ...openStates, [key]: { ...openStates[key], [valueKey]: false } })}>
                                                    <TfiSave />
                                                </button>
                                            </div>
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
        return Object.entries(openStates).map((openState) => {
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
                            openStates[key][valueKey] && <div key={uuidv4()}>{styles[key][valueKey]}</div>
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
        <Draggable
            cancel='#propertyControl'
            nodeRef={nodeRef}
        >
            <div
                id='controlContainer'
                ref={nodeRef}
                className="absolute z-50 top-1/4 pt-5 w-fit h-fit bg-slate-800 
            rounded-lg cursor-move bg-opacity-70 flex flex-col items-center"
                tabIndex={1}
                onBlur={handleBlur}
            >{renderCurrentValue()}{controls}</div>
        </Draggable>
    )
}
