const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const user = require('../models/userschema')

//create task
router.post('/createtask/:id', [body("title", "Title should be of minimum 5 charcters").isLength({ min: 5 }), body("description", "Description should be of minimum 5 characters").isLength({ min: 5 })], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else {
            if (!req.body.completed) {
                // console.log(req.body);
                const newnote = await user.updateOne({ _id: req.params.id }, { $push: { tasks: { ...req.body, incomplete: true } } })
                if (newnote) {
                    const updateuser = await user.findOne({ _id: req.params.id })
                    return res.status(200).json([{user:updateuser} , {msg:"task added"}])
                }
            }
            else {
                const newnote = await user.updateOne({ _id: req.params.id }, { $push: { tasks: req.body } })
                if (newnote) {
                    const updateuser = await user.findOne({ _id: req.params.id })
                    return res.status(200).json([{user:updateuser} , {msg:"task added"}])
                }
            }

        }
    } catch (error) {
        console.log(error);
    }
})

//update task

router.post('/updatetask/:id' , async(req,res)=>{
    try {   
    const task = await user.updateOne({tasks:{$elemMatch:{_id:req.params.id}}} , {$set:{'tasks.$.completed':req.body.completed,'tasks.$.incomplete':req.body.incomplete}})
    if(task){
        return res.json(task)
    }
    } catch (error) {
        console.log(error);        
    }
})

router.post('/deletetask' , async(req,res)=>{
    try {
        const deletetask = await user.updateOne({_id:req.body.userid} , {$pull:{tasks:{_id:req.body.delteteditem}}})
        if(deletetask){
            return res.status(200).json(deletetask)
        }
    } catch (error) {
       console.log(error);        
    }
})


router.post('/updatefortask' , async(req,res)=>{
    try {
        const updataskform = await user.updateOne({tasks:{$elemMatch:{_id:req.body._id}}} , {$set:{'tasks.$.title':req.body.title,'tasks.$.description':req.body.description,'tasks.$.important':req.body.important}})
        if(updataskform){
            return res.status(200).json(updataskform)
        }
    } catch (error) {
      console.log(error);        
    }
})
module.exports = router