const jws = require('jws')
require('mandatoryenv').load(['SECRETJWS', 'BACKEND'])

module.exports = {
  getToken: (userID, clientID, scope, is_admin, voucher) => {
    const payload = {
      sub: userID,
      iss: process.env.BACKEND,
      cid: clientID,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000) + 7200,
      scope,
      admin: is_admin,
      voucher: voucher
    }
    return jws.sign({ header: { alg: 'HS256' }, payload, secret: process.env.SECRETJWS })
  },
  verifyAndGetPayload: (token) => {
    if (!jws.verify(token, 'HS256', process.env.SECRETJWS)) return null
    return jws.decode(token, 'HS256', process.env.SECRETJWS).payload
  }
}
