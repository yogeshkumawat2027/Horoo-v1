const cloudinary = require('../config/cloudinary');

exports.getUploadSignature = async(req,res)=>{

    try{
        const timestamp = Math.round(Date.now()/1000);

        const folder = `horoo/listing/${req.user.id}`;

        const signature = cloudinary.utils.api_sign_request(
            {timestamp,folder},
            process.env.CLOUDINARY_API_SECRET   
        );

        return res.status(200).json({
             success : true , 
             cloudName: process.env.CLOUDINARY_CLOUD_NAME,
             apiKey: process.env.CLOUDINARY_API_KEY,
             timestamp,
             folder,
             signature,
            });
            
    }catch(err){
        console.log(err);

        return res.status(500).json({success : false , message : "server error"});
    }
}