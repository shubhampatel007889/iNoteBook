const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
// const { useId } = require('react');

const JWT_SECRET = 'Harryisagoodboy';
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({min:5})
],async(req,res)=>{
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({sucess,errors : errors.array()})
    }
    try{
    let user = await User.findOne({email : req.body.email});
    if (user){
        return res.status(400).json({sucess,error : "sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name:req.body.name,
        password : secPass,
        email : req.body.email

    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);

    sucess = true;
    res.json({sucess,authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
    // .then(user=>res.json(user))
    // .catch(err=>console.log(err))
    // res.json({error : 'Please enter unique email'})
    // // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
})
//Authenticate a user afeter accoun is created
router.post('/login',[
    body('email').isEmail(),
    
    body('password').exists()
],async(req,res)=>{
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})

        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if (!passwordCompare){
            sucess=false;
            return res.status(400).json({sucess,error:"Please try to login with correct credentials"})
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        sucess = true;
        res.json({sucess,authtoken})

    }catch(error){
        console.error(error.message);
        res.status(500).send(" error occured")
    }

})

//Route3 : get login user details"/api/auth/getuser"

router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userID = req.user.id;
        console.log(req.user.id)

        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send(" error occured")
    }
})
module.exports = router;
