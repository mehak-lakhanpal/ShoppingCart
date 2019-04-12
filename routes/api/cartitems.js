const route = require('express').Router();

const { User, Product, Vendor, CartItems } = require('../../db')

route.get('/:id', (req, res) => {
  CartItems.findAll({
   where:{
     userId:req.params.id,
   },
    include: [
      {
        model: Product,
        include: [Vendor]
      },
      User
    ]
  }).then((cartitems) => {
    res.status(200).send(cartitems)
  })
    .catch((err) => {
      res.status(500).send({
        error: "Could not retrieve items"
      })
    })
})


  route.post('/', async (req, res) => {
    const item = await CartItems.findOne({
      where: {
        productId: req.body.productId,
        userId: req.body.uid
      }
    })
    if (item==null||item==undefined) {
      console.log("Empty")
      CartItems.create({
        productId: req.body.productId,
        userId: req.body.uid,
        quantity: 1

      }).then((item) => {
        res.status(201).send(item)
      }).catch((err) => {
        res.status(501).send({
          error: "Could not add new caritem"
        })
      })
    } else {
      console.log("Not empty")
      CartItems.findOne({
        where: {
          productId: req.body.productId,
          userId: req.body.uid
        }
      }).then((item) => {
        item.increment({
          quantity: 1
        })
      })
    }
  })


exports = module.exports = route 