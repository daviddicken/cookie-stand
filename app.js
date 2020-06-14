'use strict';

var allStores = [];                                   
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm','4pm', '5pm', '6pm', '7pm'];                                                
var seattle = new Store('Seattle', 23, 65, 6.5);
var dubai = new Store('Dubai', 11, 38, 3.7);
var paris = new Store('Paris', 20, 38, 2.3);
var lima = new Store('Lima', 2, 16, 4.6);
var tokyo = new Store('Tokyo', 3, 24, 1.2);

Store.prototype.tableData = tableData;

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
var minCustValue = minCustInput.value;
var maxCustValue = maxCustInput.value;
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

function createTable()                          //function to create table
{
  tableHeader();                                  // header
  for(var i = 0; i < allStores.length; i++)       // fills table with data for each store
  {
    allStores[i].tableData();                     // create data for store at i index of allStore array
  }    
  createFooter();                                  //footer
}
//------------------------------------------------------------------------------------
function rebuildTable()                              //function to clear and rebuild table
{
  var table = document.getElementById('storeTable'); // find table by id
  table.innerHTML = '';                              // replace table with emptyness // learned from TA Skyler
  createTable();                                     // create new table
}
//-------------------------------------------------------------------------
function createCell(elId, rowType , cellType , theInput)
 {
  var targetId = document.getElementById(elId);              // find table
  var createRow = document.createElement(rowType);           // create row
  var createCell = document.createElement(cellType);         // create cell
  createCell.textContent = theInput;
  createRow.appendChild(createCell);

  return [targetId, createRow, createCell];
 }
//---------------------------------------------------------------------------
 function createAndAttach(row, cellType, content)
 {
    var nextCell = document.createElement(cellType);       // create cell
    nextCell.textContent = content;                        // fill cell
    row.appendChild(nextCell);                             // append to row
 }
//---------------------------------------------------------------------------------
function tableHeader() //function for creating header with hours
{
  var table = createCell('storeTable','tr','th','store'); //create first cell of header row
 
  for( var i = 0; i < storeHours.length; i++)          // loop through storeHours array to fill cells w/hours
  {  
    createAndAttach(table[1], 'th', storeHours[i])
  }
  createAndAttach(table[1], 'th', 'Totals');
  table[0].appendChild(table[1]);                     // attach row to table
}
//-----------------------------------------------------------------------------------
function tableData()                         //function for filling table with cookie data
{
  var cookieTotal = 0;                                        // keeps track of cookies sold all day
  var tempCookie = 0; 
  var table = createCell('storeTable', 'tr', 'td',this.store);     

  for(var i = 0; i < storeHours.length; i++)                  // for loop to fill each hour with sales        
  {
    tempCookie = Math.ceil(randomCustomer(this.minCust, this.maxCust) * this.avgCookie); //random number
    this.dailyTotals.push(tempCookie);                        // pushes random number to dailytotals array
    cookieTotal += tempCookie;                                // adds random number to cookie total
    createAndAttach(table[1], 'td', tempCookie);
  }

  createAndAttach(table[1],'th', cookieTotal);
  table[0].appendChild(table[1]);                                 // attach row to table
}
//-----------------------------------------------------------------------------------------
function createFooter() //footer function to get hourly totals and creating table footer
{
  var table = createCell('storeTable', 'tr', 'th', 'Totals'); //create first cell of footer
   
  for (var i = 0; i < storeHours.length; i++) //get total cookies from each store and each hour 
  {
    var hourTotal = 0;                                              // var to hold and add each stores index value
    for (var j = 0; j < allStores.length; j++)                      // get index value for each hour from each store
    {
      var theStore = allStores[j];                                 // get store from allstore array
      hourTotal += theStore.dailyTotals[i];                        // get sales for that hour from dailytotals array
    }
    createAndAttach(table[1],'th', hourTotal);
  }
  //**************** This cell doesn't get cleared by rebuild function?? ****************************************  
  var dayTotal = 0;                                                // var to hold total for all stores
  for (var k = 0; k < allStores.length; k++)                       // to loop through allstores array
  {
    var storeForDay = allStores[k];                                // get store from all store array
    dayTotal += getTotal(storeForDay.dailyTotals);                // get daily total from dailyTotal array
  }
  createAndAttach(table[1], 'th', dayTotal);
  table[0].appendChild(table[1]);                                      // attach row to table
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
