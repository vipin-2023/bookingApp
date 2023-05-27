import User from "../../models/User.js"


//GET USER FUNCTION
export const getUser = async(req,res,next)=>{       
    try{
        const user = await User.findById(req.params.id)
    res.status(200).json(user)

    }catch(err){
        next(err)
    }
}

//UPDATE USER FUNCTION
export const updateUser = async(req,res,next)=>{       
    try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedUser)

    }catch(err){
        next(err)
    }
}

//DELETE USER FUNCTION
export const deleteUser = async(req,res,next)=>{       
    try{
     await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted ")

    }catch(err){
        next(err)
    }
}

//GET ALL USERS FUNCTION
export const getAllUser = async(req,res,next)=>{       
    try{
    const users = await User.find()
    res.status(200).json(users)

    }catch(err){
        next(err)
    }
}