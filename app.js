'use strict'

/*
create a object literal for each shop
needs to output to sales.html:
1) min/max hourly customers &
   avg coockie per customer in object properties
2) uses a method of that object to generate a random number of customers per hour
3) calculate and store the amounts of coockies purchased for each hour at each location using avg coockies purchased and the number of customers per hour
4) Store the results for each location in a separate array… perhaps as a property of the object representing that location
5) Display the values of each array as a unordered list in the browser
6) Calculate the sum of these hourly totals. The output of each location should look like this:
Seattle

6am: 16 cookies
7am: 20 cookies
8am: 35 cookies
9am: 48 cookies
10am: 56 cookies
11am: 77 cookies
12pm: 93 cookies
1pm: 144 cookies
2pm: 119 cookies
3pm: 84 cookies
4pm: 61 cookies
5pm: 23 cookies
6pm: 42 cookies
7pm: 57 cookies
Total: 875 cookies

7) Display these list on sales.html

Locations min and max customers
Seattle 23-65
Tokyo    3-24
Dubai   11-38
Paris   20-38
Lima     2-16

*/
//debugger;
var mainHoursArray = ["6am: " , "7am:  " , "8am:  ", "9am; ", "10am:  ", "11am:  ", "12pm:  ", "1pm:  ", "2pm:  ", "3pm:  ", "4pm:  ", "5pm:  ", "6pm:  ","7pm: "];
//var mainHoursArray = [10, 5, 1, 1, 0, 12];


//var mainHoursArray = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];


//====================== OBJECTS =========================================
var seattle =
{
  store : "Seattle",
  minCust : 23,
  maxCust : 65,
  avgCookie : 6.3
}

var tokyo =
{
  store : "Tokyo",
  minCust : 3,
  maxCust : 24,
  avgCookie : 1.2
}

var dubai =
{
  store : "Dubai",
  minCust : 11,
  maxCust : 38,
  avgCookie : 3.7
}

var paris =
{
  store : "Paris",
  minCust : 20,
  maxCust : 38,
  avgCookie : 2.3
}

var lima =
{
  store : "Lima",
  minCust : 2,
  maxCust : 16,
  avgCookie : 4.6
}
//makeList(mainHoursArray, lima.minCust, lima.maxCust, lima.avgCookie);
var testArray = [10, 5, 1, 1, 0, 12];
makeList(mainHoursArray, lima);

function makeList(hoursArray, object )
{
console.log("hoursArray..." + hoursArray);
//debugger;
  var objectString = object.store;
//console.log("objectString........" + objectString);
  var minCustomer = object.minCust;
  var maxCustomer = object.maxCust;
  var average = object.avgCookie;
  var timeString;
  var cookieString;
  //need hours array
  //need hourlyCustomer Array
  var customerArray = getHourlyCust(testArray, minCustomer, maxCustomer);
  //var customerArray = getHourlyCust(hoursArray, minCustomer, maxCustomer);
console.log("customerArray...108  " + customerArray);
  //need cookies per hour
console.log("testArray....110   " + testArray);
  var cookiesArray = cookiesPerHour(testArray, average);
console.log("cookiesArray....112   " + cookiesArray);
  //need cookie total
  getCookieTotal(cookiesArray);
  //put li items on sales page
console.log("cookiesArray...114  " + cookiesArray);
  //create each line and target ul in sales.html
  for(var i = 0; i < hoursArray.length; i++)
  {
    //timeString = hoursArray[i];
    //get index i from hoursArray and cookies array 
  //console.log("cookiesArray[i]..." + cookiesArray[i]);
    //cookieString = cookiesArray[i];
//debugger;
    //var returnString = `${timeString} ${cookieString} cookies`;
    var returnString = hoursArray[i] + cookiesArray[i] + " cookies.";

    var  target = document.getElementById(objectString);
    var listItem = document.createElement('li');
    listItem.textContent = returnString;
    target.appendChild(listItem);
    

  }
  //grab total cookies for end
  
}


//======================= Functions ======================================
// function that takes a min number and a max number and generates a ramdom number between the two numbers
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomCustomer(min, max)
  {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
  }

  //function for generating a customer amount array for everyhour
  //pass in hours array, min customer, max customer
  function getHourlyCust(hoursArr, min, max)
  {
console.log("hoursArr..typeof..." + typeof(hoursArr));
    var custPerhour = [randomCustomer(min, max)];

    for(var i = 1; i < hoursArr.length; i++)
    {
      var randNum = randomCustomer(min, max);
      custPerhour = [custPerhour , randNum];
  //console.log("custPerhour..." + custPerhour);
    }

    return custPerhour;
  }

  // var testVar =getHourlyCust(hoursArray, 2, 10);
  // console.log(testVar);
  

  //function to figure out cookies per hour
  //need to take random customer array and each index multiply by avg cookie per customer
  // then round that number up to the nearest whole number 
  // and save in a array for cookies
  //https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/

  function cookiesPerHour(customers, avg)
  {
//debugger;
//console.log("length of customer   " + customers.length);
// console.log("customersArry im cookies per hour..." + customers);
// console.log("avg....." + avg);
// console.log("typeof...avg..." + typeof(avg));
// console.log("typeof...customers..." + typeof(customers[0]));
    var cookiesArray = customers[0];
    var tempNum;
//console.log("cookiesArray...after first math.ceil..." + cookiesArray);
    for (var i = 1; i < customers.length; i++)
    {
  //console.log("customers[i]......." + customers[i]);
      tempNum = customers[i];
      // * avg;
      cookiesArray = [cookiesArray , tempNum];
  //console.log("cookiesArray....." + cookiesArray);
    }
    return cookiesArray;
  }
// var testArray = [10, 5, 1, 1, 0, 12];
// var testAvg = 2.2;

// var arrayreturned = cookiesPerHour(testArray, testAvg);
// console.log(arrayreturned);

function getCookieTotal(cookiesArr)
{
  var total = 0

  for(var i = 0; i < cookiesArr.length; i++)
  {
    total = total + cookiesArr[i];
  }
  return total;
}

