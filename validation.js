const joi = require('@hapi/joi')

const registerValidation =  (Data)=> {
    const schema = joi.object({
        name : joi.string().required() ,
        email : joi.string().min(6).required().email(),
        password : joi.string().min(6).required(),
    });
    
      const {error, value} = schema.validate(Data) ;
    
    if(error) { 
        return (error.details[0].message);       
     }
    else return null ;
        
}
const loginValidation =  (Data)=> {
    const schema = joi.object({
        email : joi.string().min(6).required().email(),
        password : joi.string().min(6).required(),
    });
    
      const {error, value} = schema.validate(Data) ;
    
    if(error) { 
        return (error.details[0].message);       
     }
    else return null ;
        
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation