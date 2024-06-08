"use strict";
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, 'postgres.db');
fs.unlink(dbPath, (err) => {
    if (err) {
        console.error('Erro ao excluir o arquivo:');
    }
    else {
        console.log('Arquivo excluído com sucesso!');
    }
});
const db = new sqlite3.Database(dbPath);
const createTableUsers = `
  CREATE TABLE IF NOT EXISTS tb_users (
    user_id varchar(26) PRIMARY KEY,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name varchar(255) NOT NULL,
    is_active INT NOT NULL DEFAULT 1,
    is_deleted INT NOT NULL DEFAULT 2,
    type_access_level varchar(100) NOT NULL,
    email varchar(255) NOT NULL,
    picture varchar(255) NOT NULL
  )
`;
const tables = [
    {
        sql: createTableUsers,
        name: 'user'
    }
];
for (let index = 0; index < tables.length; index++) {
    db.run(tables[index].sql, (err) => {
        if (err) {
            console.error(`Error create table ${tables[index].name}`, err.message);
        }
        else {
            console.log(`Table create success ${tables[index].name}!`);
        }
    });
}
db.close();
