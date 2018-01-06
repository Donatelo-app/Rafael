const axios = require('axios');
const setup = require('../setup');

const basicTest = async () => {
  try {
    let resp = await axios.post('http://localhost:' + setup.port + '/issue', {
      label: 'Test',
      type: 'log',
      msg: 'This test messsage for check logger work'
    });
    console.log(resp.data);
  } catch(e) {
    throw e;
  }
}

basicTest();
