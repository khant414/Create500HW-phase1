
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const dbURI = "mongodb+srv://es31:twentYfiv3@cluster0.p2bvs.mongodb.net/Orders?retryWrites=true&w=majority";
const OrderSchema = require("../orderSchema");

mongoose.connect(dbURI).then(
  () => {
    console.log("DB Connection Successful");
  },
  err => {
    console.log("Error Connecting due to : ", err)
  }
)




router.post('/AddOrder', function(req, res) {
  let oneOrder = new OrderSchema(req.body);  
  console.log(req.body);
  oneOrder.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    else {

    var response = {
      status  : 200,
      success : 'Added Successfully'
    }
    res.end(JSON.stringify(response)); // send reply

    }
  });
});


const port = process.env.PORT || 3000;

module.exports = router;
