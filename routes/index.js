
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
// {$unwind:"$statuses"},
// {$group:{"_id":"$_id",
// "sold":{$last:"$statuses.sold"},
// "seller_id":{$last:"$seller_id"}}},
// {$group:{"_id":"$seller_id",
// "total_sold":{$sum:"$sold"}}},
// {$sort:{"total_sold":-1}}


router.get('/getTopSalesperson', function(req, res) {
   OrderSchema.aggregate([
    {$group: {_id:"$SalesPersonID", total:{$sum:"$PricePaid"}}}
  ])
  .sort('-total')
  .exec(function(err,topSales){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(topSales);
    res.status(200).json(topSales);

  });
});

const port = process.env.PORT || 3000;

module.exports = router;
