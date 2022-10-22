export function openStatesCalc(styles) {
    return Object.entries(styles).reduce((acc, [key, value]) => {
        acc[key] = Object.entries(value).reduce((acc, [key]) => {
            acc[key] = false;
            return acc;
        }, {});
        return acc;
    }, {})
}

export function hoverStatesCalc(styles) {
    return Object.entries(styles).reduce((acc, [key]) => {
        acc[key] = false
        return acc;
    }, {})
}