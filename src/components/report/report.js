const { loadHistory } = require('../../utils/utils.js');

const useReport = (reportDate, conditionCallback) => {
  const history = loadHistory();
  let result = '';
  let total = 0;
  const output = [];
  history.forEach(item => {
    const { categoryName, price, dates } = item;
    let count = 0;

    dates.forEach(date => {
      const historyDate = new Date(date);

      if (conditionCallback(historyDate, reportDate)) {
        count++;
        total += +price;
      }
    });

    count && output.push({ categoryName, price, count });
  });

  output.sort((prev, next) => (prev.categoryName > next.categoryName ? 1 : -1));
  output.forEach(
    data => (result += `${data.categoryName} ${data.price} ${data.count}\n`)
  );

  result += `>Total: ${total.toFixed(2)}`;
  return result;
};

const report = date => {
  const dateArr = date.replace(/\D/g, ' ').split(' ');
  let output = '';

  if (dateArr.length == 2) {
    output = useReport(date, (historyDate, reportDate) => {
      const requestDate = new Date(reportDate);
      return (
        historyDate.getFullYear() === requestDate.getFullYear() &&
        historyDate.getMonth() === requestDate.getMonth()
      );
    });
  }

  if (dateArr.length == 3) {
    output = useReport(date, (historyDate, reportDate) => {
      const requestDate = new Date(reportDate);
      return historyDate >= requestDate;
    });
  }

  return output;
};

module.exports = report;
