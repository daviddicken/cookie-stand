'use strict'

var storeHours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm","4pm", "5pm", "6pm", "7pm"];
var seattle = new Store("Seattle", 23, 65, 6.5);
var dubai = new Store("Dubai", 11, 38, 3.7);
var paris = new Store("Paris", 20, 38, 2.3);
var lima = new Store("Lima", 2, 16, 4.6);
var tokyo = new Store("Tokyo", 3, 24, 1.2);

Store.prototype.tableData = tableData;
Store.prototype.newStore = newStoreForm;

//=============================== Working on loading form =======================================
var newStoreForm = document.getElementById(storeForm);
newStoreForm = document.addEventListener('submit', function newStore(event)
{
event.preventDefault();

var theEvent = event;
var theForm = theEvent.target;
var storeInput = theForm.storeName;
var minCustInput = theForm.minCustomer;
var maxCustInput = theForm.maxCustomer;
var avgCookieInput = theForm.avgCookie;

var storeValue = storeInput.value;
var minCustValue = minCustInput.value;
var maxCustValue = maxCustInput.value;
var avgCookieValue = avgCookieInput.value;

//console.log("outputs...." , storeValue);
//console.log(storeValue, minCustValue, maxCustValue, avgCookieValue);
var formStore = new Store(storeValue, minCustValue, maxCustValue, avgCookieValue);

var table = document.getElementById('store table');
  table.innerHTML = '';
  tableHeader();
  seattle.tableData();
  tokyo.tableData();
  dubai.tableData();
  paris.tableData();
  lima.tableData();
  formStore.tableData();
  hourlyTotal();

});

function rebuildTable()
{
  var table = document.getElementById('store table');
  table.innerHTML = '';
  tableHeader();
  seattle.tableData();
  tokyo.tableData();
  dubai.tableData();
  paris.tableData();
  lima.tableData();
  formStore.tableData();
  hourlyTotal();

}




//================== Contructors ====================================================
function Store(store, minCust, maxCust, avgCookie)
{
  this.store = store,
  this.minCust = minCust,
  this.maxCust = maxCust,
  this.avgCookie = avgCookie,
  this.dailyTotals = []
}
//============================== Functions ====================================
function tableData() //function for filling table with cookie data
{
  var cookieTotal = 0;
  var tempCookie = 0;
  var table = document.getElementById("store table");
  var dataRow = document.createElement("tr");                     
  var dataCell = document.createElement("td");
  dataCell.textContent = this.store;
  dataRow.appendChild(dataCell);

  for(var i = 0; i < storeHours.length; i++)
  {
    var nextCell = document.createElement("td");
    tempCookie = Math.ceil(randomCustomer(this.minCust, this.maxCust) * this.avgCookie);
    nextCell.textContent = tempCookie;
    this.dailyTotals.push(tempCookie);
    dataRow.appendChild(nextCell);
    cookieTotal = cookieTotal + tempCookie;
  }

  var totalCell = document.createElement("th");
  totalCell.textContent = cookieTotal;
  dataRow.appendChild(totalCell);
  table.appendChild(dataRow);
}
//-------------------------------------------------------------------------
function tableHeader() //function for creating header with hours
{
  var table = document.getElementById("store table");
  var headerRow = document.createElement("tr");
  var headerCell = document.createElement("th");
  headerCell.textContent = "Store"; 
  headerRow.appendChild(headerCell);
  
  for(var i = 0; i < storeHours.length; i++)
  {  
    var nextCell = document.createElement("th");
    nextCell.textContent = storeHours[i];
    headerRow.appendChild(nextCell);
  }
    var totalCell = document.createElement("th");
    totalCell.textContent = "Totals";
    headerRow.appendChild(totalCell);

    table.appendChild(headerRow);
}
//-------------------------------------------------------------------------
function hourlyTotal() //function to get hourly totals for table footer
{
  var table = document.getElementById("store table");
  var lastRow = document.createElement("tr");
  var totalCell = document.createElement("th");
  totalCell.textContent = "Totals:";
  lastRow.appendChild(totalCell);
  table.appendChild(lastRow);
 
  for (var i =0; i < storeHours.length; i++) //gets the total cookies from each store for a single hour and adds 
  {
    var totalCell = document.createElement("th");
    
    var totalForHour = seattle.dailyTotals[i]+ //next 3 line one line
    tokyo.dailyTotals[i] + dubai.dailyTotals[i]+
    paris.dailyTotals[i] + lima.dailyTotals[i];

    totalCell.textContent = totalForHour;
    lastRow.appendChild(totalCell);
  }
  var totalCell = document.createElement("th"); //adds up daily totals for all hours/store to get grand total
  
  totalCell.textContent = getTotal(seattle.dailyTotals)+ // next 3 lines one line
  getTotal(tokyo.dailyTotals) + getTotal(dubai.dailyTotals)+
  getTotal(paris.dailyTotals) + getTotal(lima.dailyTotals);
  
  lastRow.appendChild(totalCell);
  table.appendChild(lastRow);
}
//--------------------------------------------------------------------
function getTotal(array) //function to add up values in a array
{
  var total = 0;
  for (var i = 0; i < array.length; i++)
  {
    total = total + array[i];
  }
  return total;
}
//--------------------------------------------------------------------
function randomCustomer(min, max) //function to create a random number between min and max inputs
  {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
  }
//======================================================================
//Table creater
tableHeader();
seattle.tableData();
tokyo.tableData();
dubai.tableData();
paris.tableData();
lima.tableData();
hourlyTotal();





//Make list function not used anymore but holding in case I need something from it before project is done
//function makeList()
// {
//   var totalCookies = 0;
//   for(var i = 0; i < this.amStoreHours.length; i++)
//   {
//     var  target = document.getElementById(this.store);
//     var listItem = document.createElement('li');
//     var amCookieCount = Math.ceil(randomCustomer(this.minCust, this.maxCust) * this.avgCookie);
//     listItem.textContent = this.amStoreHours[i] + "am: " + amCookieCount + " cookies";
//     target.appendChild(listItem);
//     totalCookies = totalCookies + amCookieCount;
//   }

//   for(var i = 0; i < this.pmStoreHours.length; i++)
//   {
//     var  target = document.getElementById(this.store);
//     var listItem = document.createElement('li');
//     var pmCookieCount = Math.ceil(randomCustomer(this.minCust, this.maxCust) * this.avgCookie);
//     listItem.textContent = this.pmStoreHours[i] + "pm: " + pmCookieCount  + " cookies";
//     target.appendChild(listItem);
//     totalCookies = totalCookies + pmCookieCount;
//   }

//   var  target = document.getElementById(this.store);
//   var listItem = document.createElement('li');
//   listItem.textContent = "Total: " + totalCookies + " cookies";
//   target.appendChild(listItem);
// }

