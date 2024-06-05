 import axios from "axios"
 import Booking from "../models/Booking.js"

export const initiateKhalti = async (req,res)=>{
  
    
    const{bookId, amount} = req.body;
    
    console.log(req.body.bookId)
    console.log(req.body.amount)
    if (!bookId || !amount) {
        return res.status(400).json({
            message: 'required order Id'
        });
    }
    const bookingExist = await Booking.findById(bookId);
    console.log(bookingExist);
    if (!bookingExist) {
        return res.status(404).json({
            message: 'no order exist'
        });
    }
   
    const data = {
        purchase_order_id: bookId,
        amount: amount*100 ,
        return_url: 'http://localhost:3000/success',
        website_url: 'http://localhost:3000/',
        purchase_order_name: `orderid=${bookId}`
    };
   
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
                 headers: {
                  'Authorization': 'key 191e809935014f76869721a2989cbc16'
                 }
          });
          
         bookingExist.payment_details.pidx = response.data.pidx;
          console.log(bookingExist.payment_details.pidx)
       
            await bookingExist.save();
            res.status(200).json({
            message: 'payment initiated',
            paymentUrl: response.data.payment_url,
            });
            
    
}

export const verifyPidx = async (req, res) => {
        const { pidx } = req.body;
        console.log(pidx)
         const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', { pidx }, {
             headers: {
                 'Authorization': 'key 191e809935014f76869721a2989cbc16'
              }
       });
       console.log(response.data.status)
         const user = await Booking.findOne({ 'payment_details.pidx': pidx });
         console.log(user)
         if (response.data.status === 'Completed') {
             user.payment_details.status = 'paid';
             console.log(user.payment_details.status)
            const savedUser = await user.save()
            console.log(savedUser);
             res.status(200).json({
                 message: 'successfully payment successful'
             });
         } else {
              res.status(400).json({
                 message: 'payment failed'
             });
         }
      };
     










// export const initiateKhalti = async (req, res) => {
//     const userId = req.user.id;
//      const { Id, totalAmount } = req.body;
//      if (!Id || !amount) {
//          return res.status(400).json({
//              message: 'required order Id'
//         });
//     }
//       const orderExist = await Order.findById(orderId);
//      if (!orderExist) {
//          return res.status(404).json({
//              message: 'no order exist'
//          });     }
 
//      if (orderExist.user != userId) {
//           return res.status(403).json({
//               message: 'no such order exist in your order list'
//          });
//      }
 
//       const data = {
//          purchase_order_id: orderId,
//          amount: amount * 100,
//           return_url: 'http://localhost:5173/success',
//           website_url: 'http://localhost:3000/',
//          purchase_order_name: orderid=${orderId}&&user=${userId}
//     };
//      const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
//          headers: {
//              'Authorization': 'key 191e809935014f76869721a2989cbc16'
//          }
//      });
//      orderExist.paymentDetails.pidx = response.data.pidx;
//       await orderExist.save();
//      res.status(200).json({
//         message: 'payment initiated',
//           paymentUrl: response.data.payment_url,
//       });
 
//   };
 
//   exports.verifyPidx = async (req, res) => {
//     const { pidx } = req.body;
//      const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', { pidx }, {
//          headers: {
//              'Authorization': 'key 191e809935014f76869721a2989cbc16'
//           }
//    });
//      const user = await Order.findOne({ 'paymentDetails.pidx': pidx });
//      if (response.data.status === 'Completed') {
//          user.paymentDetails.status = 'paid';
//         user.userCart = []
//          res.status(200).json({
//              message: 'successfully payment successful'
//          });
//      } else {
//           res.status(400).json({
//              message: 'payment failed'
//          });
//      }
//   };
 