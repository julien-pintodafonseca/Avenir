const sqlite = require('sqlite3').verbose()
require('mandatoryenv').load(['SECRET', 'DB'])
const db = new sqlite.Database(process.env.DB)
function dbExec (sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, (error) => {
      if (error) { reject(error); return }
      resolve()
    })
  })
}

async function init () {
  await dbExec('CREATE TABLE IF NOT EXISTS premium_vouchers (id INTEGER NOT NULL PRIMARY KEY, voucher TEXT NOT NULL, is_valid INTEGER NOT NULL, creation_date TIMESTAMP NOT NULL, expiration_date TIMESTAMP, date_of_use TIMESTAMP);')
  await dbExec("INSERT OR IGNORE INTO premium_vouchers (voucher, is_valid, creation_date, expiration_date, date_of_use) VALUES ('AAAA', 1, 0, 0 ,0);")
  await dbExec("INSERT OR IGNORE INTO premium_vouchers (voucher, is_valid, creation_date, expiration_date, date_of_use) VALUES ('BBBB', 1, 0, 0 ,0);")
  await dbExec('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, is_admin INTEGER NOT NULL, id_premium_voucher INTEGER, FOREIGN KEY(id_premium_voucher) REFERENCES premium_vouchers(id));')
  await dbExec("INSERT OR IGNORE INTO users (email, password, is_admin, id_premium_voucher) VALUES ('root@avenir.fr','root', 1, 0);")
  await dbExec("INSERT OR IGNORE INTO users (email, password, is_admin, id_premium_voucher) VALUES ('guest@avenir.fr','guest', 0, NULL);")
  await dbExec('CREATE TABLE IF NOT EXISTS cryptocurrencies (id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL UNIQUE, symbol TEXT NOT NULL UNIQUE, is_active INTEGER NOT NULL);')
  await dbExec("INSERT OR IGNORE INTO cryptocurrencies (name, symbol, is_active) VALUES ('Bitcoin','BTC', 1);")
  await dbExec("INSERT OR IGNORE INTO cryptocurrencies (name, symbol, is_active) VALUES ('Ethereum','ETH', 0);")
  await dbExec('CREATE TABLE IF NOT EXISTS market (id INTEGER NOT NULL PRIMARY KEY, timestamp TIMESTAMP NOT NULL, price REAL NOT NULL, volume_24h REAL NOT NULL, cmc_rank INTEGER NOT NULL, percent_change_1h REAL NOT NULL, percent_change_24h REAL NOT NULL, percent_change_7d REAL NOT NULL, id_cryptocurrency INTEGER NOT NULL, FOREIGN KEY(id_cryptocurrency) REFERENCES cryptocurrencies(id));')
  await dbExec('CREATE TABLE IF NOT EXISTS wallets (id INTEGER NOT NULL PRIMARY KEY, id_user INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES users(id));')
  await dbExec('CREATE TABLE IF NOT EXISTS wallets_cryptocurrencies (id_wallet INTEGER NOT NULL, id_cryptocurrency INTEGER NOT NULL, quantity REAL NOT NULL, FOREIGN KEY(id_wallet) REFERENCES wallets(id), FOREIGN KEY(id_cryptocurrency) REFERENCES cryptocurrencies(id));')
}

init()
