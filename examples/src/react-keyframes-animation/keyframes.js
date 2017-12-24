const parse = require('postcss-value-parser');

export default (string) => {
  console.log('keyframes', string);
  const ast = parse(string[0]);
  console.log('ast', ast);
};