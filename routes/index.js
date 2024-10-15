var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_VJbVzLPguvArIY',
  key_secret: 'blvABZaC307wRtTAWiyjjDZl',
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/create/orderId', (req, res) => {
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit ie in paise
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order);
  });
})



router.post('/api/payment/verify', (req, res) => {

  var razorpayPaymentId = req.body.response.razorpay_payment_id;
  var signature = req.body.response.razorpay_signature;
  var razorpayOrderId = req.body.response.razorpay_order_id;
  var secret = "zMzIVS8fTXtcu9jGUzhwrQUM"

  var status = { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
  console.log(status);
  res.send({ signatureIsValid: status })

})
//   var { validatePaymentVerification,
//     validateWebhookSignature } = require('./dist/utils/razorpay-utils');

//   var razorpayOrderId = req.body.response.razorpay_order_id
//   var razorpayPaymentId = 
//     var signature = 
//     var secret = 
//  var status = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
//   console.log(status);
// })

router.get('/success', (req, res) => {
  res.render('success')
})

module.exports = router;
