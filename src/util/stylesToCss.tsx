import convertToCssProp from "./convertToCssProp";

export default function stylesToCss(styles: object) {
  let css = "";
  const classNames = Object.keys(styles);
  const styleObjects = Object.values(styles);
  styleObjects.forEach((style, index) => {
    const cssKeys = Object.keys(style)
    const convertedCssKeys = cssKeys.map((key) => {
      return convertToCssProp(key)
    })
    const cssValues = Object.values(style)
    css += `.${classNames[index]} {
      `
    cssValues.forEach((value, index) => {
      if(index < cssValues.length - 1) {
      css += `${convertedCssKeys[index]}: ${value};
      `
      } else {
        css += `${convertedCssKeys[index]}: ${value};
}

`
      }
    })
  });
  return css;
}