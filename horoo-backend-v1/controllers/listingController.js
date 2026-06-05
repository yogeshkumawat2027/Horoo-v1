const Listing = require("../models/Listing");


exports.createListing = async(req,res)=>{

  try{
      const { name , type , price ,description , image} = req.body;

      if(!name || !price || !type){
        return res.status(400).json({ success : false , message : "name , type and price are required"});
      }

     const listing =  await Listing.create({
        name , 
        type,
        price,
        description,
        image,
        owner: req.user.id,
      });

      return res.json(201).json({ success:true , message : "listing created" , listing})

  } catch(err){
    console.log(err);
    return res.status(500).json({ success : false , message : "server error"});
  }
}

exports.editListing = async(req,res)=>{
  try{
   const { id } = req.params;

   const listing = await Listing.findByIdAndUpdate(id , req.body);

   if(!listing){
    return res.status(404).json({ success : false , message : "listing not found to edit"});
   }

   return res.status(200).json({success : true , message : "listing updated successfully" ,listing});
   
  } catch(err){
    console.log(err);
    return res.status(500).json({ success : true , message : "server error"});
  }
}

exports.deleteListing = async(req,res)=>{

  try{
     const { id } = req.params;

     const listing = await Listing.findByIdAndDelete(id);

     if(!listing){
      return res.status(404).json({ success : false , message : "listing not found or error to delete" });
     }

     return res.status(200).json({success : true , message : "listing deleted successfully" , listing});
  }catch(err){
    console.log(err);

    return res.status(500).json({success : false , message : "server error"});
  }
}