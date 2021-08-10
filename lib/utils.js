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
