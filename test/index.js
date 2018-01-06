const axios = require('axios');
const setup = require('../setup');
const api = 'http://localhost:' + setup.port;

const basicNotify = async () => {
  let resp = await axios.post(api + '/issue', {
    label: null,
    type: 'error',
    msg: 'This test messsage for check logger work',
    db: false
  });
  console.log('basicNotify:', resp.data);
}
const findLogs = async () => {
  let resp = await axios.post(api + '/find', {
    query: {type: 'log'}
  });
  console.log('findLogs:', resp.data);
}

basicNotify();
findLogs();
