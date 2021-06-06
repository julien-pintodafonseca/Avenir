const axios = require('axios')
require('mandatoryenv').load(['COIN_MARKET_API_KEY'])

const CALL_TIMER = 60000

function getCryptocurrenciesMarket (path) {
  try {
    return axios.get(path, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY
      }
    })
  } catch (error) {
    console.error(error)
  }
}

async function insertCryptocurrenciesMarket (cryptocurrenciesSelected) {
  const path = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'.concat(cryptocurrenciesSelected)
  const cryptocurrencies = getCryptocurrenciesMarket(path)
  cryptocurrencies
    .then(response => {
      if (response.data) {
        const timestamp = response.data.status.timestamp
        for (const name in response.data.data) {
          const crypto = response.data.data[name]
          const id_cryptocurrency = crypto.id
          const cmc_rank = crypto.cmc_rank
          const price = crypto.quote.USD.price
          const volume_24h = crypto.quote.USD.volume_24h
          const percent_change_1h = crypto.quote.USD.percent_change_1h
          const percent_change_24h = crypto.quote.USD.percent_change_24h
          const percent_change_7d = crypto.quote.USD.percent_change_7d

          global.db.run('INSERT INTO market(timestamp, price, volume_24h, cmc_rank, percent_change_1h, percent_change_24h, percent_change_7d, id_cryptocurrency) values(?, ?, ?, ?, ?, ?, ?, ?)',
            [timestamp, price, volume_24h, cmc_rank, percent_change_1h, percent_change_24h, percent_change_7d, id_cryptocurrency])
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function selectCryptocurrencies () {
  global.db.all('SELECT symbol FROM cryptocurrencies where is_active = 1', [],
    (error, rows) => {
      if (error) {
        console.debug(error)
        return
      }
      let symbols = '?symbol='
      rows.forEach(row => {
        symbols = symbols.concat(row.symbol).concat(',')
      })
      insertCryptocurrenciesMarket(symbols.slice(0, -1))
    })
}

module.exports = {
  selectCryptocurrencies,
  CALL_TIMER,
  getCryptocurrenciesMarket
}
