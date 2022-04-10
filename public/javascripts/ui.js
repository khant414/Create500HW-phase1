//var labels = ['StoreID_lbl', 'SalesPersonID_lbl', 'CdID_lbl', 'PricePaid_lbl', 'Date_lbl'];

//arrays holding the values that we will be using 
var ids = ['StoreID', 'SalesPersonID', 'CdID', 'PricePaid', 'Date'];
var buttons = ['CREATE', 'SUBMIT-ONE', 'SUBMIT500'];
var funcs = ['Create', 'SubmitOne', 'Create500'];

//not used yet. We need to store the json object using this.
function OrderObject(StoreID, SalesPersonID, CdID, PricePaid, Date) {
    this.StoreID = StoreID;
    this.SalesPersonID = SalesPersonID;
    this.CdID = CdID;
    this.PricePaid = PricePaid;
    this.Date = Date;
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
    //Create code here
}

function SubmitOne() {
    //SubmitOne code here
}

function Create500() {
    //Create500 code here
}
