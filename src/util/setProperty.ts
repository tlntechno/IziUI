export default function setProperty(element, property, value, dispatch) {
    dispatch({ type: "setProperty", element: element, property: property, value: value });
  }