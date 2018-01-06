const axios = require('axios');
const setup = require('../setup');

const basicTest = async () => {
  let resp = await axios.post('http://localhost:' + setup.port + '/issue', {
    label: 'Test',
    type: 'error',
    msg: 'This test messsage for check logger work',
    db: false
  });
  console.log(resp.data);
}

const pidorTest = async () => {
  let resp = await axios.post('http://localhost:' + setup.port + '/issue', {
    label: 'МАМАЕВ ПИДОР',
    type: 'warning',
    msg: 'Осторожно! Ошибка в коде ориентации!',
    db: false
  });
  console.log(resp.data);
}

// basicTest();
pidorTest();
