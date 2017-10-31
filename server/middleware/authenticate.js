const { User } = require('./../models/users');

var authenticate=(req,res,next)=>{
    var token = req.signedCookies['x-auth'];
    
      if (token) { 
        User.findByToken(token).then((user)=>{
          if(!user){
            return res.clearCookie('x-auth').redirect('/');
          }
          req.user=user;
          req.token=token;
          next();
        }).catch((e)=>{
          res.clearCookie('x-auth').redirect('/');
        })
        
      }
      else{
        res.redirect('/login');
      }
}



module.exports = {
    authenticate: authenticate
}