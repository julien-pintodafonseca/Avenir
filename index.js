const PORT = process.env.PORT || 5000
const app = require('./App')
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
