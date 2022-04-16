//var labels = ['StoreID_lbl', 'SalesPersonID_lbl', 'CdID_lbl', 'PricePaid_lbl', 'Date_lbl'];

//arrays holding the values that we will be using 
var ids = ['StoreID', 'SalesPersonID', 'CdID', 'PricePaid', 'Date'];
var buttons = ['CREATE', 'SUBMIT-ONE', 'SUBMIT500'];
var funcs = ['Create', 'SubmitOne', 'Create500'];
var order500 = [];

//not used yet. We need to store the json object using this.
function OrderObject(StoreID, SalesPersonID, CdID, PricePaid, Date) {
    this.StoreID = StoreID || null;
    this.SalesPersonID = SalesPersonID || null;
    this.CdID = CdID || null;
    this.PricePaid = PricePaid || null;
    this.Date = Date || null/*Date.now()*/;
}
//Create the UI
$(document).ready(function(){
    for(var p in ids) {
        //the values that will correspond to the OrderObject's properties.. I used a placeholder instead of 
        //labels because labels are annoying and I dont like them.
        $('.grid').append(`<input type = "text" id = ${ids[p]} placeholder = ${ids[p] + "Input"} class = "inputs">`);
    }
    //add the buttons and provide them with their respective event listeners
    for(var p in buttons) {
        $('.grid').after(`<input type = "button" id = "${buttons[p]}" class = "btns" 
        onclick = ${funcs[buttons.indexOf(buttons[p])]}() value = ${buttons[buttons.indexOf(buttons[p])]}>`);
    }
    
    $('.btns').css({        
        'width': '20%',
        'borderRadius': '25%',
        'marginLeft': '7%',
        'marginTop': '2%',
        'backgroundColor': 'teal',
        'color':'#ffffff'
    })
});

function Create(){
    var valueArray = [];
    var idx;
    var storeIdValues = [98053, 98007, 98077, 98055, 98011, 98046];
    var CdIDValues = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];
    var pricePaidValue = Math.round(Math.random() * (15 - 5) + 5);
    idx = Math.floor(Math.random() * storeIdValues.length);
    var StoreIdVal = storeIdValues[idx];
    var minSalesPersonId = (idx * 4);
    var SalesPersonIdRange = [minSalesPersonId + 1, minSalesPersonId + 2, minSalesPersonId + 3, minSalesPersonId + 4];
    idx = Math.floor(Math.random() * SalesPersonIdRange.length)
    var SalesPersonIdVal = SalesPersonIdRange[idx];
    idx = Math.floor(Math.random() * CdIDValues.length);
    var CdIdValue = CdIDValues[idx];
    var AddToDate = Math.round(Math.random() * (3000 - 500) + 500);
    var values = [StoreIdVal, SalesPersonIdVal, CdIdValue, pricePaidValue, Date.now() + AddToDate];
    for(var p in values) {
        valueArray.push(values[p]);
    }
    var keys = ["StoreId", "SalesPersonId", "CdID", "PricePaid", "OrderDate"];
    OrderObject.o = new OrderObject(valueArray[0], valueArray[1], valueArray[2], valueArray[3], valueArray[4]);
    var elems = [$('#StoreID'), $('#SalesPersonID'), $('#CdID'), $('#PricePaid'), $('#Date')];
    var props = ['StoreID', 'SalesPersonID', 'CdID', 'PricePaid', 'Date'];
    for(var i = 0; i < elems.length;i++) {
        elems[i].val(OrderObject.o[[props[i]]]);
    }
    return OrderObject.o;
}

function SubmitOne() {
    var newOrder = new Create();
    $.post('http://localhost:3000/AddOrder', newOrder)
}

function Create500() {
    for(var i = 0;i < 501;i++) {
        SubmitOne();
    }
}








/*function Create500() {
    var order = JSON.stringify(Create());

    $.post('http://localhost:3000/Add500', order)
    .done(function() {
        //console.log(`${strungOutData} posted`);        
    })
        
*/
   /* let i = 0;
   while(i < 499)
   {
       i++
       Create();
       SubmitOne();
   }
   */
//}

