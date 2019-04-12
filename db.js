const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite', // mysql, postgres, mssql
    storage: __dirname + '/shop.db'
  })

const User = db.define('users',{
  /*  id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },*/
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Vendor = db.define('vendors',{
    /*id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },*/
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
const Product = db.define('products',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0.0
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
    }
})

const CartItems = db.define('cartitem', {
    quantity: Sequelize.INTEGER
  })
  
Vendor.hasMany(Product,{ onDelete: 'cascade' })
Product.belongsTo(Vendor)
  
User.hasMany(CartItems,{onDelete:'cascade'})
CartItems.belongsTo(User)

Product.hasMany(CartItems,{onDelete:'cascade'})
CartItems.belongsTo(Product)


db.sync()
    .then(()=>console.log("Database synced"))
    .catch((err)=>console.error("Error creating db"+err))

exports = module.exports = {
    User,  Product ,Vendor ,CartItems
}