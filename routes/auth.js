const router = require('express').Router()
const User = require('../User')
const {registerValidation , loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');



router.post('/register' , async (req , res)=>{
    //validation
    const error1 =  registerValidation(req.body)
    if (error1) {return res.status(400).send(error1) }

    //looking for email repitition
    const emailExists = await User.findOne({Email : req.body.email})
    if (emailExists) { 
        return res.status(400).send('Email already exists')
    }
    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password , salt);

    //create new User    
    const user = new User({
        Name : req.body.name,
        Email : req.body.email,
        Password : hashedpassword ,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
    
})

//LOGIN

router.post('/login' , async (req , res)=>{
    //validation
    const error2 =  loginValidation(req.body)
    if (error2) {return res.status(400).send(error2) }

    //checking if the email is correct
    const user = await User.findOne({Email : req.body.email})
    if (!user) { 
        return res.status(400).send('Email is wrong')
    }
    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password , user.Password)
    if(!validPass) return res.status(400).send('invalid password')

    //create and assign a token
    const token = jwt.sign({_id : user._id} , process.env.TOKEN_SECRET)    
    res.header('auth-token' , token).send(token)   // I made a header by the name of auth-token and gave it a value{token}

    //res.send('Logged in !')    
    
})


module.exports = router ;

