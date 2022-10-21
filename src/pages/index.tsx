import IziDropdown from "components/IziDropdown";
import { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "setProperty":
      return {
        ...state, styles: {
          ...state.styles,
          [action.element]: {
            ...state.styles[action.element],
            [action.property]: action.value
          }
        }
      };
  }
}

const initialState = {
  styles: {
    iziDropdownContainer: {
      backgroundColor: "white",
      width: "300px",
      height: "60px",
      position: "relative",
      border: "2px solid gray",
      borderRadius: "5px",
      userSelect: "none",
      margin: "20px",
    },
    iziDropdownOptionContainer: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      left: "0px",
      width: "100%",
      height: "fit-content",
      backgroundColor: "white",
      outline: "2px solid gray",
    },
    iziDropdownOption: {
      backgroundColor: "white",
      width: "100%",
      height: "fit-content",
      top: "110%",
      left: "0px",
      padding: "10px",
      color: "black",
    },
    iziDropdownSelected: {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      color: "black",
      padding: "0 10px",
    }
  }
}


export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { styles } = state;
  function setProperty(element, property, value) {
    dispatch({ type: "setProperty", element: element, property: property, value: value });
  }

  return (
    <div>
      <IziDropdown
        options={["option1", "option2", "option3"]}
        initialOption={"option2"}
        open={open}
        setOpen={() => setOpen(!open)}
        selectedOption={selectedOption}
        styles={styles}
      />
      <input 
      type="radio" 
      name="color" 
      value="red" 
      onChange={(e) => setProperty("iziDropdownContainer", "backgroundColor", e.target.value)} /> Red
      <input 
      type="radio" 
      name="color" 
      value="blue" 
      onChange={(e) => setProperty("iziDropdownContainer", "backgroundColor", e.target.value)} /> Blue
      <input 
      type="radio" 
      name="color" 
      value="green" 
      onChange={(e) => setProperty("iziDropdownContainer", "backgroundColor", e.target.value)} /> Green
      <br />
      <input 
      type="radio" 
      name="radius" 
      value="3px" 
      onChange={(e) => setProperty("iziDropdownContainer", "borderRadius", e.target.value)} /> Small
      <input 
      type="radio" 
      name="radius" 
      value="7px" 
      onChange={(e) => setProperty("iziDropdownContainer", "borderRadius", e.target.value)} /> Medium
      <input 
      type="radio" 
      name="radius" 
      value="25px" 
      onChange={(e) => setProperty("iziDropdownContainer", "borderRadius", e.target.value)} /> Lars
      {/* <button onClick={() => setStyles({ ...styles, iziDropdownContainer: { ...styles.iziDropdownContainer, borderRadius: "10px" } })}>Change border radius inside of DropdownContainer</button> */}
    </div>
  )
}
