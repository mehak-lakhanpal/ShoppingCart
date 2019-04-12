const route = require('express').Router();

const Vendor = require('../../db').Vendor

route.get('/',(req,res)=>{
    Vendor.findAll()
        .then((vendors)=>{
            res.status(200).send(vendors)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrieve vendors"
            })
        })
})

route.post('/',(req,res)=>{
    Vendor.create({
        name : req.body.name
    }).then((vendor)=>{
        res.status(201).send(vendor)
    }).catch((err)=>{
        res.status(501).send({
            error:"Could not add new vendor"
        })
    })
})


route.delete('/',(req,res)=>{
var vId=req.body.vid
console.log(vId)
try{
Vendor.destroy({
    where:{
         'id':req.body.vid
        }
}
   // {truncate: false}
).then(() => {
    res.send({success: true,message:"Deleted"})
   // res.status(200).send(vendors)
})//.then(() => done());
}catch{
    res.send({success:false,message:"Error while deleting data"})
}
})


exports = module.exports = route 