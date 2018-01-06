'use strict';

const fs = require('fs');
const dateFormat = require('dateformat');
const Datastore = require('nedb-promise');
const db = new Datastore({ filename: './logger/logs.db', autoload: true });

module.exports.addLog = async (label=null, type=null, msg='', isSave=true) => {
  let date = dateFormat(new Date(), 'yyyy-mm-dd	HH:MM:ss');
  let data = {label, date, type, msg};
  return isSave ? await db.insert(data) : data;
}

module.exports.findLogs = async (req={}) => {
  return await db.find(req);
}

module.exports.getDump = async () => {
  let logs = await db.find({});
  let buffer = Buffer.from(JSON.stringify(logs));
  return buffer;
}
