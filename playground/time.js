const moment = require('moment')

// var date = new Date();
//
// console.log(date.getMonth());




let someTimestamp = moment().valueOf()
console.log(someTimestamp);

let date = moment();
console.log(date.format('Do MMM YYYY, h:mm a'));
