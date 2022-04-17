const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    StoreID: {
        type: Number,
        required:true
    },
    SalesPersonID: {
        type: Number,
        required:true
    },
    CdID: {
        type: Number,
        required:true
    },
    PricePaid: {
        type: Number,
        required:true
    },
    Date: {
        type: Date,
        required:true
    }
});

module.exports = mongoose.model("Orders", OrderSchema);

/*
"StoreID":98046
"SalesPersonID":22
"CdID":621453
"PricePaid":6
"Date":1650066838710
*/