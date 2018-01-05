'use strict';

const dateFormat = require('dateformat');
const Datastore = require('nedb-promise');
const db = new Datastore({ filename: 'logs.db', autoload: true });

module.exports.addLog = (label=null, type=null, msg='') => {
  let date = dateFormat(new Date(), 'yyyy-mm-dd	HH:MM:ss');
  let log = {label, date, type, msg};
  db.insert(log);
}

module.exports.getLogs = async (req={}) => {
  return await db.find(req);
}
