'use strict';

const dateFormat = require('dateformat');
const Datastore = require('nedb-promise');
const db = new Datastore({ filename: './logger/logs.db', autoload: true });

module.exports.addLog = async (label=null, type=null, msg='') => {
  let date = dateFormat(new Date(), 'yyyy-mm-dd	HH:MM:ss');
  return await db.insert({label, date, type, msg});
}

module.exports.getLogs = async (req={}) => {
  return await db.find(req);
}
