/**
 * Generates a random numeric id string
 * @returns string
 */
const genId = () =>
  `${Math.random().toString().substr(2)}${new Date().getUTCMilliseconds()}`;

export default genId;
