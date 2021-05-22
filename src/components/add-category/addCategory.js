const {
  loadSnacks,
  saveSnacks,
  isCategoryMatch,
} = require('../../utils/utils.js');

const addCategory = (categoryName, price, amount = 0) => {
  const snacks = loadSnacks();
  const isDuplicate = isCategoryMatch(snacks, categoryName);
  if (isDuplicate) return 'Category title taken';

  const fixedPrice = (+price).toFixed(2);

  snacks.push({
    categoryName,
    price: fixedPrice,
    amount,
  });

  saveSnacks(snacks);
  return `${categoryName} ${fixedPrice} ${amount}\n`;
};

module.exports = addCategory;
