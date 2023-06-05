const db = require("../config/connection")
const transactions = require("../routers/transactions")

exports.checkout = async (order, products) => {
    const query =  await db.query('insert into transactions set?', [order])
    .catch(err => {return err})
    if(!query.code){
        let dataProducts = []
        let idProducts = []
        products.map( item => {
            dataProducts.push([
                order.no_order,
                item.id, //ini yang dimaksud comment dibawah
                item.quantity //ini juga
            ])
            idProducts.push([
                item.id
            ])
        })

        await db.query('insert into transaction_detail(no_order, id_product, quantity) values ?', [dataProducts])

        const stockProduct = await db.query('select stock from products where id in (?)',[idProducts])

        let updateStock = []
        stockProduct.map((res, i) => {
            updateStock.push([
                dataProducts[i][1], //jadi multiple array ini, 1 mewakili indeks array dari dataProducts
                res.stock - dataProducts[i][2] // 2 sama seperti yg diatas, indeks array ke-2 dari dataProducts
            ])
        })

        await db.query('insert into products (id, stock) values ? on duplicate key update stock = values(stock)', [updateStock])
    }
    const dataOrder = await db.query(`select * from transactions where no_order = '${order.no_order}'`)
    return dataOrder
}