import React, { useEffect, useState } from 'react'
import stylesToCss from 'util/stylesToCss'
import { HexColorPicker } from "react-colorful";
import ControlInterface from './ControlInterface';
import PropertyControls from './PropertyControls';
import { hoverStatesCalc, openStatesCalc } from 'util/statesCalc';
import { CopyBlock, atomOneDark } from "react-code-blocks";
import "highlight.js/styles/atom-one-dark.css";

export default function IziDropdown({
  options,
  open,
  selectedOption,
  styles,
  setProperty
}) {

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
  const codeMarkup = `
  <div className='iziDropdownContainer' onClick={setOpen}>
    <p className='iziDropdownSelected'>{selectedOption}</p>
    {open &&
      <div className='iziDropdownOptionContainer'>
        {iziOptions()}
      </div>
    }
  </div>
  <div className='iziDropdownContainer' onClick={setOpen}>
    <p className='iziDropdownSelected'>{selectedOption}</p>
    {open &&
      <div className='iziDropdownOptionContainer'>
        {iziOptions()}
      </div>
    }
  </div>
  `

  function iziOptions() {
    return options.map((option, index) => {
      const e = {
        target: {
          id: `iziDropdownOption`,
        }
      }

      return (
        <div
          key={`dropDownOption${index}`}
          style={styles.iziDropdownOption}
          id={index === 0 ? "iziDropdownOption" : null}
          onMouseOver={(e) => handleHover(e, "iziDropdownOption")}
          onMouseOut={(e) => handleHover(e, "iziDropdownOption")}
        >
          {option}
        </div>
      )
    })
  }

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


  const customIziDropdownContainer = {
    ...styles.iziDropdownContainer,
    // border: "5px solid transparent"
  }

  function isOverflown(elementIndex) {
    const elements = []
    document.querySelectorAll(".sc-gswNZR.iWlbdk>span").forEach((element, index) => {
      return elements.push(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth)
    })

    return elements[elementIndex]
  }

  useEffect(() => {
    const elements = []
    document.querySelectorAll(".sc-gswNZR.iWlbdk>span").forEach((element, index) => {
      return elements.push(element)
    })
    if (showMore[0] && elements[0]) {
      elements[0].style.maxHeight = "none"
    }
    if (showMore[1] && elements[1]) {
      elements[1].style.maxHeight = "none"
    }
    if (!showMore[0] && elements[0]) {
      elements[0].style.maxHeight = "300px"
    }
    if (!showMore[1] && elements[1]) {
      elements[1].style.maxHeight = "290px"
    }
    setOverFlown({
      0: isOverflown(0),
      1: isOverflown(1),
    })
  }, [showMore])

  return (
    <>
      {/* @ts-ignore */}
      <div className='component-container'>
        <PropertyControls openStates={openStates} setOpenStates={setOpenStates} styles={styles} setProperty={setProperty} />
        <ControlInterface openStates={openStates} setOpenStates={setOpenStates} hoverStates={hoverStates} handleHover={handleHover}>
          <div
            style={styles.iziDropdownContainer}
            id="iziDropdownContainer"
            onMouseOver={(e) => handleHover(e)}
            onMouseOut={(e) => handleHover(e)}

          >
            <span
              style={styles.iziDropdownSelected}
              id="iziDropdownSelected"
              onMouseOver={(e) => handleHover(e)}
              onMouseOut={(e) => handleHover(e)}
            >
              {selectedOption}
            </span>
            {open &&
              <div
                style={styles.iziDropdownOptionContainer}
                id="iziDropdownOptionContainer"
                onMouseOver={(e) => handleHover(e)}
                onMouseOut={(e) => handleHover(e)}
              >
                {iziOptions()}
              </div>
            }
          </div>
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
              text={codeMarkup}
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
