import React, { useEffect, useReducer, useState } from 'react'
import { openStatesCalc } from 'util/statesCalc'
import ControlInterface from './ControlInterface'
import PropertyControls from './PropertyControls'
import ReactHtmlParse from 'react-html-parser';

export default function IziButton({ styles, styleOptions, setProperty }) {
    const [openStates, setOpenStates] = useState(openStatesCalc(styles))
    const [hoverStates, setHoverStates] = useState(null)
    const [timeOut, setTimeOut] = useState(true)
    const [showMore, setShowMore] = useState({
        0: false,
        1: false,
    })
    const [overFlown, setOverFlown] = useState({
        0: false,
        1: false,
    })

    function handleHover(e: any, custom = null) {
        const cleanedId = e.target.id && e.target.id.split("-")[0];
        console.log(e.type, cleanedId, e.target.id, custom, (cleanedId !== "" || custom !== null));
        if (e.type === "mouseout" && (cleanedId !== "" || custom !== null)) {
            setTimeOut(true)
        }
        if (cleanedId === "" && custom === null) return;
        if (e.type === "mouseover") {
            setTimeOut(false)
            setHoverStates(custom ? custom : cleanedId)
        }
    }

    useEffect(() => {
        const time = setTimeout(() => {
            if (timeOut) {
                setHoverStates(null)
                setTimeOut(false)
            }
        }, 50);

        return () => {
            clearTimeout(time);
        }
    }, [timeOut])

    function isOverflown(elementIndex) {
        const elements = []
        document.querySelectorAll(".sc-gswNZR.iWlbdk>span").forEach((element, index) => {
            return elements.push(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth)
        })

        return elements[elementIndex]
    }

    useEffect(() => {
        const div = []
        const span = []
        document.querySelectorAll(".sc-gswNZR.iWlbdk").forEach((element, index) => {
            return div.push(element)
        })
        document.querySelectorAll(".sc-gswNZR.iWlbdk>span").forEach((element, index) => {
            return span.push(element)
        })
        if (showMore[0] && div[0]) {
            div[0].style.maxHeight = "none"
        }
        if (showMore[1] && div[1]) {
            div[1].style.maxHeight = "none"
        }
        if (!showMore[0] && div[0]) {
            div[0].style.maxHeight = "300px"
        }
        if (!showMore[1] && div[1]) {
            div[1].style.maxHeight = "300px"
        }
        if (showMore[0] && span[0]) {
            span[0].style.maxHeight = "none"
        }
        if (showMore[1] && span[1]) {
            span[1].style.maxHeight = "none"
        }
        if (!showMore[0] && span[0]) {
            span[0].style.maxHeight = "285px"
        }
        if (!showMore[1] && span[1]) {
            span[1].style.maxHeight = "285px"
        }
        setOverFlown({
            0: isOverflown(0),
            1: isOverflown(1),
        })
    }, [showMore])


    return (
        <div className='component-container'>
            <PropertyControls styles={styles} styleOptions={styleOptions} setProperty={setProperty} openStates={openStates} setOpenStates={openStates} />
            <ControlInterface styleOptions={styleOptions} openStates={openStates} setOpenStates={setOpenStates} hoverStates={hoverStates} handleHover={handleHover}>
                <div id="iziButtonContainer" style={styles.iziButtonContainer}>iziButton</div>
            </ControlInterface>
        </div>
    )
}
