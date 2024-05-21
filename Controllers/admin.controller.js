//admin controller
async function isAdmin(req,res){
    const{admin_id}=req.params
    const admin=await adminModel.findById(admin_id)
    if(admin){
        //If admin is found,return true
        return true;
    }else{
        //if admin is not found ,return message
        res.status(200).json({message:"Error!Admin Not Found"})
    }
}

async function getAdmin(req,res){
    const{admin_id}=req.params
    const isAdminFound = await isAdmin(req, res);
    if (isAdminFound) {
        // If admin is found, return all details
        const adminDetails = await adminModel.findById(admin_id);
        res.status(200).json(adminDetails);
    } else {
        // If admin is not found, return message
        res.status(200).json({ message: "Error!Admin Not Found" });
    }

}

async function editAdmin(req,res){
    const{admin_id}=req.params
    const isAdminFound=await isAdmin(req,res)
    if(isAdminFound){
        const admin=await adminModel.findByIdAndUpdate(admin_id,req.body)
        if(admin){
          const updatedAdmin=await adminModel.findById(admin_id)
          res.status(200).json(updatedAdmin)
        }else{
            res.status(200).json({ message: "Error!Admin Not Found to Edit" })
        }
    }else{
        res.status(200).json({ message: "Error!Admin Not Found" });
    }
}