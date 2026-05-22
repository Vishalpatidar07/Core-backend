const jwt=require('jsonwebtoken');


async function artistAuth(req,res,next){
  try{
      const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
  
    const decode=jwt.verify(token,process.env.JWT_SCRETE);
    if(decode.role!=='artist'){
        return res.status(403).json({
            message:"You are not allow to access"
        })
    }
    req.user=decode;

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
        message:"Unauthuorized"
    })
  }

}

async function userAuth(req,res,next){

  try {
    const token=req.cookies.token;

  if(!token){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }
  
  const decode=jwt.verify(token,process.env.JWT_SCRETE);

  if(decode.role!=='user'){
     return res.status(403).json({
      message:"you not allow to access"
    })
  }

  req.user=decode;
  next();
    
  } catch (error) {
    return res.status(401).json({
      message:"Unauthorized"
    })
  }
  


}


module.exports={artistAuth,userAuth};