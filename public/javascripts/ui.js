//var labels = ['StoreID_lbl', 'SalesPersonID_lbl', 'CdID_lbl', 'PricePaid_lbl', 'Date_lbl'];

//arrays holding the values that we will be using 
var ids = ['StoreID', 'SalesPersonID', 'CdID', 'PricePaid', 'Date'];
var buttons = ['CREATE', 'SUBMIT-ONE', 'SUBMIT500','query1', 'query2'];
var funcs = ['Create', 'SubmitOne', 'Create500','query1','query2'];
var order500 = [];

//Format Currency
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
//Format Time Strings
function GetTimeString(){
    let timeElapsed = Date.now();
    let rightNow = new Date(timeElapsed);
    return rightNow.toISOString();
}

//not used yet. We need to store the json object using this.
function OrderObject(StoreID, SalesPersonID, CdID, PricePaid, Date) {
    this.StoreID = StoreID || null;
    this.SalesPersonID = SalesPersonID || null;
    this.CdID = CdID || null;
    this.PricePaid = PricePaid || null;
    this.Date = GetTimeString() || null; /*Date.now()*/
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
    console.log(newOrder);
}

function Create500() {
    for(var i = 0;i < 501;i++) {
        SubmitOne();
    }
}
function query1() {
        $('#topSalesResultsTable').remove();
        $('#topSalesBanner').remove();
        $.get( 'http://localhost:3000/getTopSalesperson', function( data ) {
            $('.grid').append('<h1 id="topSalesBanner"> Top 3 Sales Persons</h1>')
                var content = "<table id='topSalesResultsTable'>";
                content += "<th>SalesPersonID</th>";
                content += "<th>Total</th>";
                for(i=0; i<3; i++){
                    content += '<tr><td>' + data[i]._id + '</td><td>' + formatter.format(data[i].total) + '</td></tr>';
                }
                content += "</table>";
            $('.grid').append(content);   
        }, "json");
}

function query2() {
    
    $('.grid').before("<div id = 'results'><ul></ul></div>");
    $('#results').css({
        'position':'absolute',
        'top':'18%',
        'left': '4%',
    });
    setTimeout(randomlySelectWinner, 1500); 

    $.get('http://localhost:3000/promo1')
    .done(function(data){
        $('#results ul').append(`<li>Sales Group 1 Winner: ${data[0]._id} : ${data[0].totalSales}</li>`)
    });
    $.get('http://localhost:3000/promo2')
    .done(function(data){
        $('#results ul').append(`<li>Sales Group 2 Winner: ${data[0]._id} : ${data[0].totalSales}</li>`)
    });
    $.get('http://localhost:3000/promo3')
    .done(function(data){
        $('#results ul').append(`<li>Sales Group 3 Winner: ${data[0]._id} : ${data[0].totalSales}</li>`)
    });
    $.get('http://localhost:3000/promo4')
    .done(function(data){        
        $('#results ul').append(`<li>Sales Group 4 Winner: ${data[0]._id} : ${data[0].totalSales}</li>`)
    });
    $.get('http://localhost:3000/promo5')
    .done(function(data){
        $('#results ul').append(`<li>Sales Group 5 Winner: ${data[0]._id} : ${data[0].totalSales}</li>`)
    });
}

function randomlySelectWinner(){
    var r = Math.round(Math.random() * 5)
    $('#results ul li').eq(r).css('color', 'red')
}
