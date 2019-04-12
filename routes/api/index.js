const route = require('express').Router()

route.use('/users',require('./users'))
route.use('/products',require('./products'))
route.use('/vendors',require('./vendors'))
route.use('/cartitems',require('./cartitems'))

exports = module.exports = {
    route
}