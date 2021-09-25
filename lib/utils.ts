/**
 * Capitalise all words in a string
 * @param {*} str String to convert
 * @returns String with capitalised words
 */
export function titleCase(str) {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

/**
 * Removes the last word in a string
 * @param {*} str String to remove the last word from
 * @param {*} delimiter The char in between the word
 * @returns String with the last word removed
 */
export function removeLastWord(str, delimiter) {
  let arr = str.split(delimiter) // create arr array
  arr.pop() // remove last word
  return arr.join(' ') // array to string separated by spaces
}

/**
 * Gets the last word in a string
 * @param {*} str String to get the last word from
 * @param {*} delimiter The char in between the word
 * @returns The last word
 */
export function getLastWord(str, delimiter) {
  return str.split(delimiter).pop()
}

/**
 * Checks if two arrays are equal
 * @param {*} a array A
 * @param {*} b array B
 * @returns True if the arrays are equal
 */
export function arraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
