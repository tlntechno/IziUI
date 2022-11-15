import React, { useReducer } from 'react'
import { reducer } from 'pages/iziDropdown'
import IziButton from 'components/IziButton'


const initialState = {
    styles: {
        iziButtonContainer: {
            backgroundColor: "red",
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
                min: 300,
                max: 1000,
                default: 300,
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
    return (
        <>
            <IziButton styles={styles} styleOptions={styleOptions} setProperty={setProperty} />
        </>
    )
}
