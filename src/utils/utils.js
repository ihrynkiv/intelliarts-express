const fs = require('fs');
const path = require('path');

const historyPath = path.join(__dirname, '../data/history.json');
const snacksPath = path.join(__dirname, '../data/snacks.json');

const loadData = path => {
  try {
    return JSON.parse(fs.readFileSync(path).toString());
  } catch (e) {
    return [];
  }
};

const saveData = (data, path) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync(path, dataJSON);
};

const loadSnacks = () => loadData(snacksPath);
const loadHistory = () => loadData(historyPath);

const saveSnacks = snacks => saveData(snacks, snacksPath);
const saveHistory = data => saveData(data, historyPath);

const isCategoryMatch = (arr, categoryName) =>
  arr.some(obj => obj.categoryName === categoryName);

module.exports = {
  loadSnacks,
  loadHistory,
  saveSnacks,
  saveHistory,
  isCategoryMatch,
};
