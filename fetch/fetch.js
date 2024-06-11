const express = require('express')
let mongodb = require('mongodb')

const url = require('../url')

let mcl = mongodb.MongoClient
//create router instance

let router = express.Router()

//create rest api
router.get("/",(req,res)=>{
    mcl.connect(url,(err,conn)=>{
        if(err){
            console.log('Error in connection')
        }else{
            let db =conn.db('nodedb')
            db.collection('products').find().toArray((err,array)=>{
                if(err){
                    console.log("error",err)
                }else{
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})

module.exports=router