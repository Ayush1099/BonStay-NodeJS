const express=require('express');
const routing=express.Router();
const userController=require('../Controller/userController')
const hotelController=require('../Controller/hotelController')
const bookingController=require('../Controller/bookingController')

routing.post('/registerUser',userController.userRegister)
routing.post('/loginUser',userController.userLogin)

routing.post('/registerHotel',hotelController.registerHotel)
routing.get('/gethotels',hotelController.getHotels)

routing.post('/bookings/:userId/:hotelName',bookingController.userBooking)
routing.put('/updateBookings/:userId',bookingController.updateBooking)
routing.delete('/deleteBookings/:userId/:bookingId',bookingController.deleteBooking)
routing.get('/getBookings/:userId',bookingController.getBooking)

module.exports=routing;
