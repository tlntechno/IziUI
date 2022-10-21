import convertToCssProp from "./convertToCssProp";

export default function stylesToCss(styles: object) {
  const css = [];
  const classNames = Object.keys(styles);
  const styleObjects = Object.values(styles);
  styleObjects.forEach((style, index) => {
    const cssKeys = Object.keys(style)
    const convertedCssKeys = cssKeys.map((key) => {
      return convertToCssProp(key)
    })
    const cssValues = Object.values(style)
    css.push(
      <div style={{ marginBottom: "10px"}}>
        {`.${classNames[index]} {`}
        {
          convertedCssKeys.map((key, index) => {
            return <div key={`key${index}`} style={{ margin: "5px 0 5px 20px" }}>{`${key}: ${cssValues[index]};`}</div>
          })
        }
        {`},`}
      </div>
    )
  });
  return css;
}