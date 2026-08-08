const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next)=>{
    try{
        let token; 

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token && req.cookies.token){
            token = req.cookies.token;
        }

        if(!token) return res.status(401).json({ success : false, message : " Login reqiured"  });
            
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        // console.log(decoded);

        req.user = decoded;

        next();

    }catch(err){
        console.log(err);
        res.status(401).json({
            success : false,
            message: "Login / Signup required"
        });
    }
}