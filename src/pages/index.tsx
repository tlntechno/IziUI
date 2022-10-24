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
      backgroundColor: "white",
      color: "black",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      left: "0px",
      width: "100%",
      height: "fit-content",
      outline: "2px solid gray",
    },
    iziDropdownOption: {
      backgroundColor: "white",
      color: "black",
      width: "100%",
      height: "fit-content",
      top: "110%",
      left: "0px",
      padding: "10px",
    },
    iziDropdownSelected: {
      color: "black",
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "0 10px",
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
    }
  }
}


export default function Home() {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { styles } = state;
  console.log({ styles });

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
        setProperty={setProperty}
      />
      {/* <button onClick={() => setStyles({ ...styles, iziDropdownContainer: { ...styles.iziDropdownContainer, borderRadius: "10px" } })}>Change border radius inside of DropdownContainer</button> */}
    </div>
  )
}
