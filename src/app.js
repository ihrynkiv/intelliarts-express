const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

//import functions
const addCategory = require('./components/add-category/addCategory');
const addItem = require('./components/add-item/addItem');
const purchase = require('./components/purchase/purchase');
const list = require('./components/list/list.js');
const clear = require('./components/clear/clear.js');
const report = require('./components/report/report');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'List & Clear',
  });
});

app.use(bodyParser.json());

app.post('/list', (req, res) => {
  const output = list();
  res.send({ output });
});

app.post('/clear', (req, res) => {
  const output = clear();
  res.send({ output });
});

app.get('/addCategory', (req, res) => {
  const { categoryName, price, amount } = req.query;
  let output = '';

  if (categoryName) output = addCategory(categoryName, price, amount);

  res.render('addCategory', {
    title: 'Add Category',
    output,
  });
});

app.get('/addItem', (req, res) => {
  const { categoryName, amount } = req.query;
  let output = '';

  if (categoryName) output = addItem(categoryName, amount);

  res.render('addItem', {
    title: 'Add Item',
    output,
  });
});

app.get('/purchase', (req, res) => {
  const { categoryName, date } = req.query;
  let output = '';

  if (categoryName) output = purchase(categoryName, date);

  res.render('purchase', {
    title: 'Purchase',

    output,
  });
});

app.get('/report', (req, res) => {
  const { date } = req.query;
  let output = '';

  if (date) output = report(date);
  res.render('report', {
    title: 'Report',
    output,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
