export function calculateRowsNumbers(array, arrayLength, maxValue) {
  do {
    for (let rows = 0; rows < arrayLength; rows++) {
      array[rows] = Math.ceil(Math.random() * 3);
    }
    // first and last element must have value of 1
    array[0] = 1;
    array[arrayLength] = 1;
  } while (array.reduce((a, b) => a + b) !== (maxValue));
}
