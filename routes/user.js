const express = require('express')
const router = express.Router()
const user = require('../models/userschema')
const { body, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

//create user
router.post('/createuser',
    body('email').isEmail(), body('name', 'Name should be of minimum 5 characters').isLength({ min: 5 }), body('password', 'Password should be of minimum 5 characters').isLength({ min: 5 })
    , async (req, res) => {
        try {
            const errors = validationResult(req)
            const arr = errors.array()
            const finduserbyemail = await user.findOne({ email: req.body.email })
            if (!errors.isEmpty() && finduserbyemail) {
                return res.status(400).json({ errors: [...arr, { path: "email", msg: 'User Already Exits' }] })
            }
            else if (!errors.isEmpty()) {
                return res.status(400).json({ errors: [...arr] })
            }
            else if (finduserbyemail) {
                return res.status(400).json({ errors: [{ path: "email", msg: 'User Already Exits' }] })
            }
            else {
                const hashpassword = await bcryptjs.hash(req.body.password, 10)
                const newuser = new user({ ...req.body, password: hashpassword })
                const saveuser = await newuser.save()
                if (saveuser) {
                    return res.json({ msg: 'Sign up successfull' })
                }
            }
        } catch (error) {
            console.log(error);
        }
    })


 //login user
 router.post('/loginuser' , async(req,res)=>{
    try {
        const findemail = await user.findOne({email:req.body.email})
        if(findemail){
           const checkpassword = await bcryptjs.compare(req.body.password , findemail.password)
           if(checkpassword){
            return res.status(200).json({msg:findemail._id})
           }
           else{
            return res.status(400).json({msg:'invalid credentials'})
           }
        }
        else{
            return res.status(400).json({msg:'invalid credentials'})
        }
    } catch (error) {
        console.log(error);
    }
 })   

//get user
router.get('/getuser/:id' , async(req,res)=>{
    try {
        const finduser = await user.findOne({_id:req.params.id})
        if(finduser){
            return res.status(200).json(finduser)
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router