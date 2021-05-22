const { loadSnacks } = require('../../utils/utils.js');

const list = () => {
  const snacks = loadSnacks();
  let output = '';
  //sort by amount
  snacks.sort(
    (prevSnack, currentSnack) => prevSnack.amount - currentSnack.amount
  );

  snacks.forEach(snack => {
    output += `${snack.categoryName} ${snack.price} ${+snack.amount}\n`;
  });
  return output;
};

module.exports = list;
