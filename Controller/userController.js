const userModel=require("../Model/Schema/userSchema");
const validators =require("../Utilities/validator");
require('cookie');

exports.userRegister=async(req,res)=>{
    try {
        if (!validators.ValidateUserName(req.body.Name)) {
            res.status(400).json({
                status:"error",
                data:{"message":"Enter a Valid Name with atleast 3 characters"}
            })
        } 
        else if(!validators.ValidateUserPhone(req.body.PhoneNo)) {
            res.status(400).json({
                status:"error",
                data:{"message":"Enter a valid phone number with 10 digits"}
            })
        } 
        else if(!validators.ValidateUserEmailId(req.body.EmailId)) {
            res.status(400).json({
                status:"error",
                data:{"message":"Enter a valid EmailId"}
            })
        } 
        else if(!validators.ValidateUserPassword(req.body.Password)){
            res.status(400).json({
                status:"error",
                data:{ "message":"Password should be of 8-12 characters"}
            })
        } 
        else {
            const newUser=await userModel.create(req.body);
            res.status(200).json({
                status:"success",
                data:{"message":`Successfully registered with user id ${newUser._id}`}
            })
        }
    } catch (error) {
        res.status(400).json({
            status:"error",
            data:{"message":`User already exists with Email Id : ${req.body.EmailId}`}
        })
    }
}
exports.userLogin=async (req,res)=>{
    if(validators.ValidateUserPassword(req.body.Password)){
        const user=await userModel.find({_id:req.body.UserId});
        if(user.length > 0){
            res.status(201).cookie('name',req.body.UserId).json({
                status:"success",
                data:{"message":"Logged in User ID"}
            })
        }else{
            res.status(400).json({
                status:"error",
                data:{"message":"Incorrect User ID"}
            })
        }
    }
    else{
        res.status(400).json({
            status:"error",
            data:{"message":"Incorrect Password"}
        })
    }
} 