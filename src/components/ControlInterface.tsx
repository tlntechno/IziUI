import React, { Children, cloneElement, useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaArrowsAltH, FaArrowsAltV, FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import { MdRoundedCorner } from 'react-icons/md';

export default function ControlInterface({ children, openStates, setOpenStates, hoverStates, handleHover }) {
    const [controls, setControls] = useState([])

    const openTrueFalse = []
    Object.values(openStates).forEach((openState) => {
        return Object.values(openState).forEach((value) => {
            openTrueFalse.push(value)
        })
    })

    function addControls(child) {
        if (!child.props || !child.props.id) return null;
        const childId = child.props.id;
        const cleanedId = childId.split("-")[0];
        // console.log(cleanedId);

        const childStyles = Object.keys(child.props.style);
        const childStyleValues = Object.values(child.props.style);
        const controls = childStyles.map((style: string) => {
            function icon() {
                let icon = null
                switch (style) {
                    case "color":
                        icon = <p style={{ color: "white", mixBlendMode: "difference" }}>T</p>;
                        break;
                    case "width":
                        icon = <FaArrowsAltH />;
                        break;
                    case "height":
                        icon = <FaArrowsAltV />;
                        break;
                    case "borderRadius":
                        icon = <MdRoundedCorner />;
                        break;
                    case "padding":
                        icon = <FaCompressArrowsAlt />;
                        break;
                    case "margin":
                        icon = <FaExpandArrowsAlt />;
                        break;
                    default:
                        return null;
                }
                return (
                    <>
                        <div style={{ position: "absolute", inset: "0", backgroundColor: "transparent", width: "100%", height: "100%" }} id={childId + "-controls"}
                            onMouseOver={(e) => { e.stopPropagation(); handleHover(e); console.log("hovered", e.target) }}></div>
                        {icon}
                    </>
                )
            }
            switch (style) {
                case "backgroundColor":
                case "color":
                case "width":
                case "height":
                case "borderRadius":
                case "padding":
                case "margin":
                    return (

                        <div
                            key={`control${style}${childId}`}
                            id={childId + "-controls"}
                            onMouseOver={(e) => { e.stopPropagation(); handleHover(e) }}
                            onClick={(e) => { e.stopPropagation; setOpenStates({ ...openStates, [childId]: { ...openStates[childId], [style]: true } }) }}
                            className="control"
                            style={{
                                // @ts-ignore
                                backgroundColor: style === "backgroundColor" || style === "color" ? childStyleValues[childStyles.indexOf(style)] : "",
                                color: "white",
                            }}
                        >
                            {style !== "backgroundColor" &&
                                <span
                                    id={childId + "-controls"}
                                    onMouseOver={(e) => { e.stopPropagation(); handleHover(e) }}
                                    style={{ position: "relative", width: "100%", height: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}
                                >
                                    {icon()}
                                </span>}
                        </div>
                    )
                default:
                    return null
            }
        })

        const controlsContainer = (
            openTrueFalse.every((state) => state === false) && (hoverStates === childId || hoverStates === cleanedId) &&
            <div
                key={childId}
                id={childId + "-controls"}
                onMouseOver={(e) => { e.stopPropagation(); handleHover(e) }}
                style={{ display: "flex", flexDirection: "row", transform: "translate(-20px, -50%)", position: "absolute", top: "0" }}
            // style={{ display: "flex", flexDirection: "row", transform: "translate(-10px, -50%)", position: childStyleValues.includes("absolute") ? "absolute" : "relative" }}
            >
                {controls}
            </div>
        )

        // const newChildren = cloneElement(child, { children: [child.props.children, controlsContainer] })

        return controlsContainer;
    }

    function recursiveMap(children, root = false) {
        // console.log({ children });

        if (!Array.isArray(children)) {
            if (!children.props) return children;
            if (children.props.children && Array.isArray(children.props.children)) {
                const controls = addControls(children);
                const recursiveChildren = children.props.children.map((child) => {
                    const key = child.props.id + uuidv4();
                    if (child.props?.children) {
                        const controls = addControls(child);
                        return cloneElement(child, {
                            children: [recursiveMap(child.props.children), controls],
                            key
                        });
                    } else {
                        const shallowChildren = children;
                        shallowChildren.push(controls)
                        return cloneElement(child, {
                            children: shallowChildren,
                            key
                        });
                    }
                })
                const key = children.props.id + uuidv4();

                return cloneElement(children, {
                    children: [recursiveChildren, controls],
                    key
                });
            }
            else if (children.props.children && typeof children.props.children === "object") {
                const childWithControls = addControls(children);
                const key = children.props.id + uuidv4();
                return cloneElement(children, {
                    children: [recursiveMap(children.props.children), childWithControls],
                    key
                });
            }
            return addControls(children);
        }
        else {
            return children.map((child) => {
                const controls = child?.props?.style ? addControls(child) : child;
                const key = child?.props?.id + uuidv4();
                if (child?.props?.children) {
                    return cloneElement(child, {
                        children: [recursiveMap(child.props.children), controls],
                        key: key
                    });
                } else if (child?.props) {
                    return cloneElement(child, {
                        key: key
                    });
                }
                return child;
            });
        }
    }

    useEffect(() => {
        setControls(recursiveMap(children, true))
    }, [openStates, children])


    return (
        <div>
            {recursiveMap(children, true)}
        </div>
    )
}
