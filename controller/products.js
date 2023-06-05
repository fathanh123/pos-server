const db = require("../config/connection") //pake "" bukan ''

exports.getProducts = async () => {
    return await db.query("SELECT * FROM products")
    
}

exports.createProduct = async(data) => {
    const query =await db.query("insert into products set ?", [data])
    if(!query.affectedRows) return "error when inserting product"
    return "product successfully created"
}