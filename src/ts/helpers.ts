export function stringToArray(str: string): Uint8Array {
    var array = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i);
    }
    return array;
}

export function arrayToString(array: Uint8Array): string {
    var str = "";
    for (var i = 0; i < array.length; i++) {
        str += String.fromCharCode(array[i]);
    }
    return str;
}
