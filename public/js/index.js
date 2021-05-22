const baseUrl = 'http://localhost:3000';

const list = document.querySelector('#list');
const clear = document.querySelector('#clear');
const textArea = document.querySelector('#output');

list.addEventListener('click', async () => {
  const response = await fetch(baseUrl + '/list', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list: true }),
  });
  const result = await response.json();
  textArea.innerHTML = result.output;
});

clear.addEventListener('click', async () => {
  const response = await fetch(baseUrl + '/clear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clear: true }),
  });
  const result = await response.json();
  textArea.innerHTML = result.output;
});
