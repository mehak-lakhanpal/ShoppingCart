const User = require('../../db').User
const route = require('express').Router();

route.get('/',(req,res)=>{
    User.findAll()
        .then((users)=>{
            res.status(200).send(users)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrieve users"
            })
        })
})

route.post('/',(req,res)=>{
    User.create({
        name : req.body.name
    }).then((user)=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(501).send({
            error:"Could not add new user"
        })
    })
})

route.get('/:name',async (req,res)=>{
    console.log(req.params.name+"hiii")
   const userRes= await User.findAll({
        where:{
             'name':req.params.name
            }
    }
       // {truncate: false}
    )//.then(() => {
      //  res.status(201).send(userRes)
      console.log("user onj:"+userRes)
      res.send(userRes)
      
       // res.status(200).send(vendors)
  /*  }).catch((err)=>{
        res.status(501).send({
            error:"Not a valid user"
        })
    })  */ 
 })

exports = module.exports = route 