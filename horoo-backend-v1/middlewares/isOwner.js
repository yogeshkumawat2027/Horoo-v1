exports.isOwner = (req,res,next)=>{

    if(req.user.role !== "owner"){
        return res.status(403).json({
            success : false,
            message : "only owner can access this route"
        })
    }

    next();
}