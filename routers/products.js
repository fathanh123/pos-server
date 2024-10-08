const express = require('express')
const products = express.Router()
const { getProducts, createProduct } = require("../controller/products")

products.route('/').get( async (req, res) => {
    res.send(await getProducts())

})
// products.route('/').get((req, res) => {
//     db.query("SELECT * FROM products", (err, result) => {
//         if(err) throw err
//         console.log(result)
//         //res.json(result)
//     })
//     res.send("tes get")
// })

products.route('/').post(async (req, res) => {
    const {name, price, stock} = req.body
    const data = {
        name, price, stock
    }
    res.send(await createProduct(data))
})

module.exports = products