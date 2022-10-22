import React, { useState } from 'react'
import stylesToCss from 'util/stylesToCss'
import { HexColorPicker } from "react-colorful";
import ControlInterface from './ControlInterface';
import PropertyControls from './PropertyControls';
import { hoverStatesCalc, openStatesCalc } from 'util/statesCalc';

export default function IziDropdown({
  options,
  initialOption,
  open,
  setOpen,
  selectedOption,
  styles,
  setProperty
}) {

  // const [openStates, setOpenStates] = useState({
  //   iziDropdownContainer: {
  //     backgroundColor: false,
  //     width: false,
  //     height: false,
  //     position: false,
  //     border: false,
  //     borderRadius: false,
  //     userSelect: false,
  //     margin: false,
  //   },
  //   iziDropdownOptionContainer: {
  //     display: false,
  //     flexDirection: false,
  //     position: false,
  //     top: false,
  //     left: false,
  //     width: false,
  //     height: false,
  //     backgroundColor: false,
  //     outline: false,
  //   },
  //   iziDropdownOption: {
  //     backgroundColor: false,
  //     width: false,
  //     height: false,
  //     top: false,
  //     left: false,
  //     padding: false,
  //     color: false,
  //   },
  //   iziDropdownSelected: {
  //     position: false,
  //     inset: false,
  //     width: false,
  //     height: false,
  //     color: false,
  //     padding: false,
  //   }
  // });

  const [openStates, setOpenStates] = useState(openStatesCalc(styles))
  const [hoverStates, setHoverStates] = useState(null)
  const timeOutRef = React.useRef(null);

  function iziOptions() {
    return options.map((option, index) => {
      return (
        <div
          key={`dropDownOption${index}`}
          style={styles.iziDropdownOption}
          id="iziDropdownOption"
          onMouseOver={(e) => handleHover(e)}
        >
          {option}
        </div>
      )
    })
  }

  function handleHover(e: any) {
    const cleanedId = e?.target?.id.split("-")[0];
    console.log(e.type, cleanedId);
    if (e.type === "mouseout") {
      return timeOutRef.current = setTimeout(() => {
        setHoverStates(null)
      }, 100000);
    }
    if (hoverStates === cleanedId || cleanedId === "") return;
    if (e.type === "mouseover") {
      clearTimeout(timeOutRef.current);
      setHoverStates(cleanedId)
    }
  }

  // console.log(hoverStates);

  const customIziDropdownContainer = {
    ...styles.iziDropdownContainer,
    border: "5px solid transparent"
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "300px", background: "rgb(213,2,223)", background: "linear-gradient(180deg, rgba(213,2,223,1) 0%, rgba(147,0,186,1) 0%, rgba(0,143,172,1) 100%)" }}>
        <PropertyControls openStates={openStates} setOpenStates={setOpenStates} styles={styles} setProperty={setProperty} />
        <ControlInterface openStates={openStates} setOpenStates={setOpenStates} hoverStates={hoverStates} handleHover={handleHover}>
          <div
            style={customIziDropdownContainer}
            id="iziDropdownContainer"
            onMouseOver={(e) => handleHover(e)}
            onMouseOut={(e) => handleHover(e)}

          >
            <span
              style={styles.iziDropdownSelected}
              id="iziDropdownSelected"
              onMouseOver={(e) => handleHover(e)}
            >
              {selectedOption}
            </span>
            {open &&
              <div
                style={styles.iziDropdownOptionContainer}
                id="iziDropdownOptionContainer"
                onMouseOver={(e) => handleHover(e)}
              >
                {iziOptions()}
              </div>
            }
          </div>
        </ControlInterface>
      </div>
      <div style={{ height: "100%", padding: "30px", backgroundColor: "white", color: "black" }}>
        <code>
          {stylesToCss(styles)}
        </code>
        <br /><br />
        <code>
          <div>{`<div className='iziDropdownContainer' onClick={setOpen}>`}</div>
          <div className='indentation1'> {`<p className='iziDropdownSelected'>{selectedOption}</p>`}</div>
          <div className='indentation2'>{`{open &&`}</div>
          <div className='indentation3'> {` <div className='iziDropdownOptionContainer'>`}</div>
          <div className='indentation4'>  {` {iziOptions()} `}</div>
          <div className='indentation3'> {`</div>`} </div>
          <div className='indentation2'>{`}`}</div>
          {`</div>`}
        </code>
      </div>
    </>
  )
}
