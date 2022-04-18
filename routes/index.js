
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



router.get('/promo1', function(req, res) {
  var groups = [];
  var g1 = 
  OrderSchema.aggregate( [
    { $match: { $and: [ { SalesPersonID: { $gt: 0, $lt: 5 } } ] } },
    { $group: {_id : "$SalesPersonID", totalSales : { $sum : { $toInt : "$PricePaid" } }}}
  ] );
  var sortedG1 = g1.sort('-totalSales').limit(1);
  sortedG1.exec(function(err,data){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(data);
    res.status(200).send(data);
  });
});

router.get('/promo2', function(req, res) {  
  var g2 = 
  OrderSchema.aggregate( [
    { $match: { $and: [ { SalesPersonID: { $gt: 4, $lt: 9 } } ] } },
    { $group: {_id : "$SalesPersonID", totalSales : { $sum : { $toInt : "$PricePaid" } }}}
  ] );
  var sortedG2 = g2.sort('-totalSales').limit(1);
  sortedG2.exec(function(err,data){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(data);
    res.status(200).send(data);    
  });
});

router.get('/promo3', function(req, res) {
  var g3 = 
  OrderSchema.aggregate( [
    { $match: { $and: [ { SalesPersonID: { $gt: 8, $lt: 13 } } ] } },
    { $group: {_id : "$SalesPersonID", totalSales : { $sum : { $toInt : "$PricePaid" } }}}
  ] );
  var sortedG3 = g3.sort('-totalSales').limit(1);
  sortedG3.exec(function(err,data){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(data);
    res.status(200).send(data);    
  });
});

router.get('/promo4', function(req, res) {
  var g4 = 
  OrderSchema.aggregate( [
    { $match: { $and: [ { SalesPersonID: { $gt: 12, $lt: 17 } } ] } },
    { $group: {_id : "$SalesPersonID", totalSales : { $sum : { $toInt : "$PricePaid" } }}}
  ] );
  var sortedG4 = g4.sort('-totalSales').limit(1);
  sortedG4.exec(function(err,data){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(data);
    res.status(200).send(data);   
  });
});

router.get('/promo5', function(req, res) {
    var g5 = 
    OrderSchema.aggregate( [
      { $match: { $and: [ { SalesPersonID: { $gt: 16, $lt: 21 } } ] } },
      { $group: {_id : "$SalesPersonID", totalSales : { $sum : { $toInt : "$PricePaid" } }}}
    ] );
    var sortedG5 = g5.sort('-totalSales').limit(1);
    sortedG5.exec(function(err,data){
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log(data);
      res.status(200).send(data);   
  });
});







const port = process.env.PORT || 3000;

module.exports = router;
