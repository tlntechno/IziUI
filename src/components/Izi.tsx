import React, { useEffect, useState } from 'react'
import { atomOneDark, CopyBlock } from 'react-code-blocks'
import { openStatesCalc } from 'util/statesCalc'
import stylesToCss from 'util/stylesToCss'
import ControlInterface from './ControlInterface'
import PropertyControls from './PropertyControls'

export default function Izi({ children, styles, styleOptions, setProperty, jsx }) {
    const initialOpenStates = openStatesCalc(styles)
    const [openStates, setOpenStates] = useState(initialOpenStates)
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
        <>
            <div className='component-container'>
                <PropertyControls
                    styles={styles}
                    styleOptions={styleOptions}
                    setProperty={setProperty}
                    openStates={openStates}
                    setOpenStates={setOpenStates}
                    initialOpenStates={initialOpenStates}
                />
                <ControlInterface styleOptions={styleOptions} openStates={openStates} setOpenStates={setOpenStates} hoverStates={hoverStates} handleHover={handleHover}>
                    {children}
                </ControlInterface>
            </div>
            <div className="component-docs">
                <div className='component-docs-container'>
                    <div className="component-docs-inner">
                        <h1>CSS</h1>
                        <CopyBlock
                            language="css"
                            text={stylesToCss(styles)}
                            showLineNumbers={true}
                            theme={atomOneDark}
                            codeBlock
                        />
                        {overFlown[0] && !showMore[0] &&
                            <div className='code-block-show-more' onClick={() => setShowMore(prev => ({ ...prev, 0: true }))}>
                                Show more
                            </div>}
                        {showMore[0] &&
                            <div className='code-block-show-more' onClick={() => setShowMore(prev => ({ ...prev, 0: false }))}>
                                Show less
                            </div>}
                    </div>
                </div>
                <div className='component-docs-container'>
                    <div className="component-docs-inner">
                        <h1>JSX</h1>
                        <CopyBlock
                            language="jsx"
                            text={jsx}
                            showLineNumbers={true}
                            theme={atomOneDark}
                            codeBlock
                        />
                        {overFlown[1] && !showMore[1] &&
                            <div className='code-block-show-more' onClick={() => setShowMore(prev => ({ ...prev, 1: true }))}>
                                Show more
                            </div>}
                        {showMore[1] &&
                            <div className='code-block-show-more' onClick={() => setShowMore(prev => ({ ...prev, 1: false }))}>
                                Show less
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
