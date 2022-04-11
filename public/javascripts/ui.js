//var labels = ['StoreID_lbl', 'SalesPersonID_lbl', 'CdID_lbl', 'PricePaid_lbl', 'Date_lbl'];

//arrays holding the values that we will be using 
var ids = ['StoreID', 'SalesPersonID', 'CdID', 'PricePaid', 'Date'];
var buttons = ['CREATE', 'SUBMIT-ONE', 'SUBMIT500'];
var funcs = ['Create', 'SubmitOne', 'Create500'];

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
    //for the buttons styles.. not supposed to style elements from js but this is a small assignment.
    $('.btns').css({        
        'width': '20%',
        'borderRadius': '25%',
        'marginLeft': '7%',
        'backgroundColor': 'teal',
        'color':'#ffffff'
    })
});


//To populate the OrderObject we have to assign the correct values to the OrderObject's given properties then stringify
//it as a json object


function Create(){
    var valueArray = [];
    var idx;
    var storeIdValues = [98053, 98007, 98077, 98055, 98011, 98046];
    var CdIDValues = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];
    var pricePaidValue = Math.round(Math.random() * (15 - 5) + 5);
    idx = Math.round(Math.random() * storeIdValues.length);
    var StoreIdVal = storeIdValues[idx];
    //console.log(`Store Id : ${StoreIdVal}`);
    var minSalesPersonId = (idx * 4);
    var SalesPersionIDRange = [minSalesPersonId + 1, minSalesPersonId + 2, minSalesPersonId + 3, minSalesPersonId + 4];

    idx = Math.round(Math.random() * CdIDValues.length);
    var CdIdValue = CdIDValues[idx];
    //console.log(`CdId Value : ${CdIdValue}`)
    var AddToDate = Math.round(Math.random() * (30 - 5) + 5);
    //console.log(`AddToDate: ${AddToDate}`)
    valueArray.push(StoreIdVal);
    valueArray.push(SalesPersionIDRange);
    valueArray.push(CdIdValue);
    valueArray.push(pricePaidValue);
    valueArray.push(Date.now() + AddToDate);
    var keys = ["StoreId", "SalesPersonId", "CdID", "PricePaid", "OrderDate"];
    OrderObject.o = new OrderObject(valueArray[0], valueArray[1], valueArray[2], valueArray[3], valueArray[4]);
    for(var p in OrderObject.o) {
        console.log(OrderObject.o[p]);
    }


}

function SubmitOne() {
    //SubmitOne code here
}

function Create500() {
    //Create500 code here
}
