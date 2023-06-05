const express = require('express')
const transactions = express.Router()
const { randomOrderNumber } = require("../helpers/utils")
const { checkout } = require('../controller/transactions')

transactions.route('/').post(async (req, res) => {
    const { total_price, paid_amount } = req.body
    const data = {
        no_order : randomOrderNumber(), total_price, paid_amount
    }
    res.send(await checkout(data))
})

module.exports = transactions;