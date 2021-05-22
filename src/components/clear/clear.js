const { loadSnacks, saveSnacks } = require('../../utils/utils.js');

const clear = () => {
  let snacks = loadSnacks();
  let output = '';

  snacks = snacks.filter(snack => {
    if (+snack.amount !== 0) return snack;
    output = `${snack.categoryName} ${snack.price}\n`;
  });

  saveSnacks(snacks);
  return output;
};

module.exports = clear;
