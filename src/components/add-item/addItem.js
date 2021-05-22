const {
  loadSnacks,
  saveSnacks,
  isCategoryMatch,
} = require('../../utils/utils.js');

const addItem = (categoryName, amount) => {
  const snacks = loadSnacks();
  let output = '';

  if (!isCategoryMatch(snacks, categoryName))
    return `${categoryName} not found`;

  snacks.forEach(snack => {
    if (snack.categoryName === categoryName) {
      snack.amount = +snack.amount + +amount;
      output = `${categoryName} ${snack.price} ${snack.amount}\n`;
    }
  });
  saveSnacks(snacks);
  return output;
};

module.exports = addItem;
