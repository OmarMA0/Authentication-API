const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify,(req ,res )=>{        //added the verify middle ware 
    res.json({posts: {title: 'my first post' , description : 'random data you should not access'}})
})




module.exports = router ;