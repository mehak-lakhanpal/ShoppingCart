const route = require('express').Router();

const Product = require('../../db').Product
const Vendor = require('../../db').Vendor

route.get('/',(req,res)=>{
    Product.findAll({
        include: [ Vendor ]
    })
        .then((products)=>{
            res.status(200).send(products)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrieve products"
            })
        })
})

route.post('/',(req,res)=>{
    if(isNaN(req.body.price)){
        return res.status(403).send({
            error: "Price is not a valid number"
        })
    }
    if((req.body.quantity)<=0){
        return res.status(403).send({
            error: "Quantity is not valid"
        })
    }
    Product.create({
        name : req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        vendorId:req.body.vendorId
    }).then((product)=>{
        res.status(201).send(product)
    }).catch((err)=>{
        res.status(501).send({
            error:"Could not add new product"
        })
    })
})


route.delete('/',(req,res)=>{
    try{
    Product.destroy({
        where:{
             'id':req.body.pid
            }
    }
    ).then(() => {
        res.send({success: true,message:" Product Deleted"})
    })
    }catch{
        res.send({success:false,message:"Error while deleting data"})
    }
})

exports = module.exports = route 