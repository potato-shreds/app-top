// var store = require('app-store-scraper');

// store
//   .search({
//     term: 'panda',
//     num: 2,
//     page: 3,
//     country: 'us',
//     lang: 'lang',
//   })
//   .then(console.log)
//   .catch(console.log);

const Database = require('./database/db.js'); // 引入封装好的数据库模块

// 获取数据库实例
const db = Database.getInstance('./database/mydatabase.db');

const createTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS app_top (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      region TEXT,
      category TEXT,
      content TEXT
    );
  `;
  await db.run(sql);
  console.log('Table created or already exists.');
};

createTable();
