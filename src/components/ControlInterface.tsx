import React, { Children, cloneElement, useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaArrowsAltH } from 'react-icons/fa';

export default function ControlInterface({ children, openStates, setOpenStates, hoverStates, handleHover }) {
    const [controls, setControls] = useState([])

    const openTrueFalse = []
    Object.values(openStates).forEach((openState) => {
        return Object.values(openState).forEach((value) => {
            openTrueFalse.push(value)
        })
    })

    function addControls(child) {
        if (!child.props || !child.props.id) return child;
        const childId = child.props.id;
        const cleanedId = childId.split("-")[0];
        console.log(cleanedId);
        
        const childStyles = Object.keys(child.props.style);
        const childStyleValues = Object.values(child.props.style);
        const controls = childStyles.map((style: string) => {
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
                                backgroundColor: style === "backgroundColor" || style === "color" ? childStyleValues[childStyles.indexOf(style)] : "",
                                color: "white",
                            }}
                        >
                            {style === "color" && "T"}
                            {style === "width" && <FaArrowsAltH fill='#FFF' />}
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
                style={{ display: "flex", flexDirection: "row", transform: "translate(-20px, -50%)", position: "absolute" }}
            // style={{ display: "flex", flexDirection: "row", transform: "translate(-10px, -50%)", position: childStyleValues.includes("absolute") ? "absolute" : "relative" }}
            >
                {controls}
            </div>
        )

        const newChildren = cloneElement(child, { children: [child.props.children, controlsContainer] })

        return newChildren;
    }

    function recursiveMap(children, root = false) {
        if (!Array.isArray(children)) {
            if (!children.props) return children;
            if (children.props.children && Array.isArray(children.props.children)) {
                const parentWithControls = root && addControls(children);
                const recursiveChildren = children.props.children.map((child) => {
                    if (child.props?.children) {
                        const childWithControls = addControls(child);
                        const key = child.props.id + uuidv4();
                        return cloneElement(childWithControls, {
                            children: [recursiveMap(child.props.children), childWithControls.props.children[1]],
                            key
                        });
                    }
                    return addControls(child)
                })
                const key = children.props.id + uuidv4();

                if (!root) return cloneElement(children, { children: recursiveChildren, key });
                return cloneElement(parentWithControls, {
                    children: [recursiveMap(recursiveChildren), parentWithControls.props.children[1]],
                    key
                });
            }
            else if (children.props.children && typeof children.props.children === "object") {
                const childWithControls = addControls(children);
                const key = children.props.id + uuidv4();
                return cloneElement(childWithControls, {
                    children: [recursiveMap(children.props.children), childWithControls.props.children[1]],
                    key
                });
            }
            return addControls(children);
        }
        else {
            return children.map((child) => {
                if (child?.props?.children) {
                    const childWithControls = child.props.style ? addControls(child) : child;
                    const key = child.props.id + uuidv4();

                    return cloneElement(childWithControls, {
                        children: [recursiveMap(child.props.children), childWithControls.props.children[1]],
                        key: key
                    });
                } else if (child?.props) {
                    return addControls(child)
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
            {controls}
        </div>
    )
}
