const User = require('../../db').User
const route = require('express').Router();

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
 })

exports = module.exports = route 