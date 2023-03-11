const bookingModel=require("../Model/Schema/bookingSchema");
const validators =require("../Utilities/validator");
var userModel=require('../Model/Schema/userSchema');
var hotelModel=require('../Model/Schema/hotelSchema');

exports.userBooking=async(req,res)=>{
    try {
        const user = await userModel.find({_id:req.params.userId});
        const hotel = await hotelModel.find({HotelName:req.params.hotelName});
        const userDate = await userModel.find({_id:req.params.userId,"UserBookings.StartDate": req.body.StartDate});

        if(user.length==0){
            res.status(404).json({
                status:"error",
                data:{"message":"Invalid UserID"}
            })
        }
        else if(hotel.length==0){
            res.status(404).json({
                status:"error",
                data:{"message":"Invalid Hotel Name"}
            })
        }
        else if(validators.ValidateDate(req.body.StartDate, req.body.EndDate)){
            res.status(400).json({
                status:"error",
                data:{"message":"End Date Should be greater then Start Date"}
            })
        }
        else if(userDate.length > 0){
            res.status(400).json({
                status: "error",
                data: {
                    "message": "You have a booking on the same date"
                }
            })
        }
        else{
            const booking = await (await bookingModel.create(req.body)).save();
            await bookingModel.findByIdAndUpdate(booking._id, {UserId : req.params.userId});
            await userModel.findByIdAndUpdate(req.params.userId, {UserBookings : req.body}, {new:true});
            res.status(200).json({
                status:"Success",
                data:{"message":`Booking Confirmed, booking id : ${booking._id}`}
            })
        }
    } catch (error) {
        res.status(400).json({
            status:error,
            data:{"message":"Booking Failed"}
        })
    }  
}
exports.updateBooking=async(req,res)=>{
    try {
        if(validators.ValidateDate(req.body.StartDate, req.body.EndDate)){
            res.status(400).json({
                status:"error",
                data:{"message":"End Date Should be greater then Start Date"}
            })
        }
        await bookingModel.findByIdAndUpdate(req.body._id, req.body);
        await userModel.findByIdAndUpdate(req.params.userId, {UserBookings : req.body}, {new:true});

        res.status(200).json({
            status:"success",
            data:{"message":"Updated Successfully"}
        })
    } catch (error) {
        res.status(400).json({
            status:error,
            data:{"message":"Not a valid Booking Id or User Id"}
        })
    }
}
exports.deleteBooking=async(req,res)=>{
    try {
        await bookingModel.findByIdAndDelete(req.params.bookingId);
        await userModel.findByIdAndUpdate(req.params.userId, { $pull: { UserBookings: {  _id: req.params.bookingId } } }, { new: true })

        res.status(200).json({
            status:"success",
            data:{"message":"Deleted Successfully"}
        })
    } catch (error) {
        res.status(400).json({
            status:error,
            data:{"message":"Cannot Delete the booking"}
        })
    }
}
exports.getBooking=async(req,res)=>{
    try {
        const Bookings=await bookingModel.find({UserId:req.params.userId},{_id:0,__v:0,UserId:0});
        if(Bookings.length>0){
            res.status(200).json({
                status:"success",
                data:{Bookings}
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data:{"message":"No Bookings Made"}
            })
        }
    } catch (error) {
        res.status(400).json({
            status:error,
            data:{"message":"Failed"}
        })
    }
}