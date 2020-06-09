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

var seattle =
{
  store : "Seattle",
  minCust : 23,
  maxCust : 65,
  avgCookie : 6.3,
  hours : ["6am: ", "7am:  ", "8am:  ", "9am; ", "10am:  ", "11am:  ", "12pm:  ", "1pm:  ", "2pm:  ", "3pm:  ", "4pm:  ", "5pm:  ", "6pm:  ","7pm: ","Total: " ],
  //hourlyCookies : [],
  //totalCookies : 0,
  
}

// function that takes a min number and a max number and generates a ramdom number between the two numbers
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomCustomer(min, max)
  {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
  }

  //function for generating a customer amount for everyhour
  var hoursArray = ["6am: ", "7am:  ", "8am:  ", "9am; ", "10am:  ", "11am:  ", "12pm:  ", "1pm:  ", "2pm:  ", "3pm:  ", "4pm:  ", "5pm:  ", "6pm:  ","7pm: ","Total: " ];

  function getHourlyCust(hoursArr, min, max)
  {

    var custPerhour = [randomCustomer(min, max)];

    for(var i = 1; i < (hoursArr.length - 1); i++)
    {
      var randNum = randomCustomer(min, max);
      custPerhour = `${custPerhour}, ${randNum}`;
    }

    return custPerhour;
  }

  var testVar =getHourlyCust(hoursArray, 2, 10);
  console.log(testVar);
  
  //function to figure out coockies per hour
  //need to take random customer array and each index multiply by avg coockie per customer
  // then round that number up to the nearest whole number 
  // and save in a array for cookies
  //https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/

  function cookiesPerHour(customers, avg)
  {
    var cookiesArray = Math.ceil(`${customers[0]}` * avg);

    for (var i = 1; i < customers.length; i++)
    {
      var tempNum = Math.ceil(customers[i] * avg);
      cookiesArray = `${cookiesArray}, ${tempNum}`;
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

function makeList()
{
  //need hours array
  //need hourlyCookies Array
  //need cookie total
  //get an array to work with
  //put li items on sales page
  //
}