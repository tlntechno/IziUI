export default function convertToCssProp(cssProp: string) {
    const cssCharArray = cssProp.split("");
    cssCharArray.forEach((char, index) => {
        if (char === char.toUpperCase()) {
            cssCharArray[index] = `-${char.toLowerCase()}`;
        }
    });
    return cssCharArray.join("");
}