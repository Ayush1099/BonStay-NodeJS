const hotelModel=require("../Model/Schema/hotelSchema");

exports.registerHotel=async(req,res)=>{
    const newHotel=await hotelModel.create(req.body);
    res.status(200).json({
        status:"success",
        data:{"message":`Successfully registered with HotelName ${newHotel.HotelName}`}
    })
}
exports.getHotels=async(req,res)=>{
    const getHotels=await hotelModel.find({}, { _id: 0, __v: 0 })
    if(getHotels.length>0){
        res.status(200).json({
            status:"success",
            results:getHotels.length,
            data:{getHotels}
        })
    }
}