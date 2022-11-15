import Izi from 'components/Izi'
import React, { useReducer } from 'react'
import { reducer } from 'pages/iziDropdown'

const initialState = {
    styles: {
        iziButtonContainer: {
            backgroundColor: "#333333",
            width: "150px",
            height: "60px",
            border: "2px solid gray",
            borderRadius: "5px",
            userSelect: "none",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
        },
    },
    styleOptions: {
        iziButtonContainer: {
            backgroundColor: true,
            width: {
                min: 100,
                max: 1000,
                default: 150,
                step: 10,
            },
            height: {
                min: 30,
                max: 500,
                default: 60,
                step: 10,
            },
            borderRadius: {
                min: 0,
                max: 50,
                default: 5,
                step: 1,
            }
        }
    }
}

export default function index() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { styles, styleOptions } = state
    function setProperty(element, property, value) {
        dispatch({ type: "setProperty", element: element, property: property, value: value });
    }
    const jsx = `<div className='iziDropdownContainer' onClick={setOpen}>
  <p className='iziDropdownSelected'>{selectedOption}</p>
  {open &&
    <div className='iziDropdownOptionContainer'>
      {iziOptions()}
    </div>
  }
</div>
`

    return (
        <Izi styles={styles} styleOptions={styleOptions} setProperty={setProperty} jsx={jsx}>
            <div id="iziButtonContainer" style={styles.iziButtonContainer}>iziButton</div>
        </Izi>
    )
}
