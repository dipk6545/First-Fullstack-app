const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');;

const jwt_Secret = 'deep&789.123(khawas)'

//Create user using post /api/auth/createuser
router.post('/createuser', [
    //validations of email, name, password
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 6 }),
] ,async (req,res)=>{
    //If error return bad request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {  
    //check if use with email exists already
    let user = await User.findOne({email: req.body.email})    
    if(user){ //if exsist then
      console.log("Found",user.name + " " +user.email);
      return res.status(400).json({error: "User already exist!!!"})      
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    //otherwise    
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      })
    
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data, jwt_Secret);
    res.json({authToken})

    }catch (error) {
      console.error(error);
      res.status(500).send("error occured !!!!!!!!!") 
    }
})

module.exports = router