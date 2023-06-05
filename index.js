const express = require('express')
const app = express()
const cors = require('cors')
const products = require('./routers/products')
const transactions = require('./routers/transactions')
const bodyParser = require('body-parser')
const port = 3002

app.use(cors())
app.use(bodyParser.json())

app.get('/', async(req, res) => {
  res.send('Hello World!')
})


app.use('/products', products)
// app.post('/product', (req, res) => {
//     console.log(req.body)
//     res.send('testing')
// })
app.use('/transactions', transactions)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})