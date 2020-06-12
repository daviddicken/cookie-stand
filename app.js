'use strict'

var allStores = [];
var storeHours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm","4pm", "5pm", "6pm", "7pm"];
var seattle = new Store("Seattle", 23, 65, 6.5);
var dubai = new Store("Dubai", 11, 38, 3.7);
var paris = new Store("Paris", 20, 38, 2.3);
var lima = new Store("Lima", 2, 16, 4.6);
var tokyo = new Store("Tokyo", 3, 24, 1.2);

Store.prototype.tableData = tableData;
//Store.prototype.newStore = newStoreForm;

//========================= Loads new store to table on button click =================

var newStoreForm = document.getElementById(storeForm);
newStoreForm = document.addEventListener('submit', function newStore(event)
{
event.preventDefault();
var theEvent = event;                     // sending event to a variable to be processed
var theForm = theEvent.target;            // grabs data that was input
var storeInput = theForm.storeName;       
var minCustInput = theForm.minCustomer;
var maxCustInput = theForm.maxCustomer;
var avgCookieInput = theForm.avgCookie;

var storeValue = storeInput.value;
var minCustValue = minCustInput.value;// parseInt(minCustInput.value);
var maxCustValue = maxCustInput.value;//parseInt(maxCustInput.value);
var avgCookieValue = parseFloat(avgCookieInput.value);

var formStore = new Store(storeValue, minCustValue, maxCustValue, avgCookieValue);

rebuildTable()
});

//================== Contructors ====================================================
function Store(store, minCust, maxCust, avgCookie)
{
  this.store = store,
  this.minCust = minCust,
  this.maxCust = maxCust,
  this.avgCookie = avgCookie,
  this.dailyTotals = [],
  allStores.push(this)
}
//============================== Functions ====================================

//----------------------------------------------------------------------------------
function createTable()                          //function to create table
{
tableHeader();                                  // header
for(var i = 0; i < allStores.length; i++)       // fills table with data for each store
{
  allStores[i].tableData();                     // create data for store at i index of allStore array
}    
hourlyTotal();                                  //footer
}
//------------------------------------------------------------------------------------
function rebuildTable()                              //function to clear and rebuild table
{
  var table = document.getElementById('storeTable'); // find table by id
  table.innerHTML = '';                              // replace table with emptyness // learned from TA Skyler
  createTable();                                     // create new table
}
//-------------------------------------------------------------------------
function tableHeader() //function for creating header with hours
{
  var table = document.getElementById("storeTable");  // find table
  var headerRow = document.createElement("tr");       // create row
  var headerCell = document.createElement("th");      // create cell
  headerCell.textContent = "Store";                   // add "Store" text to cell
  headerRow.appendChild(headerCell);                  // attach cell to row
  
  for( var i = 0; i < storeHours.length; i++)          // loop through storeHours array to fill cells w/hours
  {  
    var nextCell = document.createElement("th");      // create cell
    nextCell.textContent = storeHours[i];             // fill cell with value in i index of storeHours array
    headerRow.appendChild(nextCell);                  // attach cell to row
  }
    var totalCell = document.createElement("th");     // create cell
    totalCell.textContent = "Totals";                 // put text "Totals" in last cell on header
    headerRow.appendChild(totalCell);                 // attatch cell to row
    table.appendChild(headerRow);                     // attach row to table
}
//-----------------------------------------------------------------------------------
function tableData()                         //function for filling table with cookie data
{
  var cookieTotal = 0;                                        // keeps track of cookies sold all day
  var tempCookie = 0;                                         // holds random number generated
  var table = document.getElementById("storeTable");          // find table
  var dataRow = document.createElement("tr");                 // create row
  var dataCell = document.createElement("td");                // create cell
  dataCell.textContent = this.store;                          // put store name in cell
  dataRow.appendChild(dataCell);                              // attach to row

  for(var i = 0; i < storeHours.length; i++)                  // for loop to fill each hour with sales        
  {
    var nextCell = document.createElement("td");              // create cell
    tempCookie = Math.ceil(randomCustomer(this.minCust, this.maxCust) * this.avgCookie); //random number
    nextCell.textContent = tempCookie;                        // puts random number in cell
    this.dailyTotals.push(tempCookie);                        // pushes random number to dailytotals array
    dataRow.appendChild(nextCell);                            // attaches cell to row
    cookieTotal += tempCookie;                                // adds random number to cookie total
  }

  var totalCell = document.createElement("th");               // create cell for day total
  totalCell.textContent = cookieTotal;                        // put cookie total in cell
  dataRow.appendChild(totalCell);                             // attach cell to row
  table.appendChild(dataRow);                                 // attach row to table
}
//-----------------------------------------------------------------------------------------
function hourlyTotal() //footer function to get hourly totals and creating table footer
{
  var table = document.getElementById("storeTable");                 // find table
  var lastRow = document.createElement("tr");                        // create row
  var totalCell = document.createElement("th");                             // create cell
  totalCell.textContent = "Totals:";                                 // put text in cell
  lastRow.appendChild(totalCell);                                    // attach cell to row
  
  for (var i = 0; i < storeHours.length; i++) //get total cookies from each store and each hour 
  {
    var totalCell = document.createElement("th");                   // create cell
    
    var hourTotal = 0;                                              // var to hold and add each stores index value
    for (var j = 0; j < allStores.length; j++)                      // get index value for each hour from each store
    {
      var theStore = allStores[j];                                 // get store from allstore array
      hourTotal += theStore.dailyTotals[i];                                             // get sales for that hour from dailytotals array
    }
    totalCell.textContent = hourTotal;                             // put total for hour from all stores in cell
    lastRow.appendChild(totalCell);                                // attach cell
  }
  //**************** This cell doesn't get cleared by rebuild function?? **************************************** 
  var totalCell = document.createElement("th");                    // create cell for total of all stores today
  var dayTotal = 0;                                                // var to hold total for all stores
  for (var k = 0; k < allStores.length; k++)                       // to loop through allstores array
  {
    var storeForDay = allStores[k];                                // get store from all store array
    dayTotal += getTotal(storeForDay.dailyTotals);       // get daily total from dailyTotal array
  }
  totalCell.textContent = dayTotal;                                // place all stores daily total in cell
  lastRow.appendChild(totalCell);                                  // attach cell to row
  table.appendChild(lastRow);                                      // attach row to table
}
//--------------------------------------------------------------------
function getTotal(array) //function to add up values in a array
{
  var total = 0;
  for (var i = 0; i < array.length; i++)
  {
    total += array[i];
  }
  return total;
}
//--------------------------------------------------------------------
function randomCustomer(min, max) //function to create a random number between min and max inputs
  {
    var randomNum = Math.ceil(Math.random() * (max - min + 1) + min);
    return randomNum;
  }

//=========================================================================

createTable();
