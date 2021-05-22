const {
  loadSnacks,
  loadHistory,
  saveSnacks,
  saveHistory,
  isCategoryMatch,
} = require('../../utils/utils.js');

const pushDate = (arr, name, date) => {
  arr.forEach(item => {
    if (item.categoryName === name) item.dates.push(date);
  });
};

const purchase = (categoryName, date) => {
  const history = loadHistory();
  let output = '';
  let snacks = loadSnacks();
  if (!isCategoryMatch(snacks, categoryName))
    return `We have no ${categoryName}\n`;

  snacks.forEach(snack => {
    if (snack.categoryName === categoryName && snack.amount < 1) {
      output = `${categoryName} no found`;
      return;
    }

    if (snack.categoryName === categoryName && snack.amount >= 1) {
      snack.amount--;
      if (!isCategoryMatch(history, categoryName)) {
        history.push({ categoryName, price: snack.price, dates: [] });
      }
      pushDate(history, categoryName, date);
      output = `${date}\n${categoryName} ${snack.price}\n`;

      saveHistory(history);
    }
  });

  saveSnacks(snacks);
  return output;
};

module.exports = purchase;
