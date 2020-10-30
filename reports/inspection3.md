# Inspection 03 - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Trip.js (15-287)* |
| Meeting | *10/30/20, 2:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jimit Bhalavat | 50 mins |
| Frank Gansukh | 37 mins |
| Sean Munoz | 35 mins |
| Kyle Cummings | 38 mins |
| Jake Barth | 35 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:269-272 | searchListArray with 0 elements to cause Data Faults. | low | jimit | Issue #805 |
| Trip.js:99-104 | for loop uncertain to terminate. (Check upper-bound of array) | low | jimit | Issue #806 |
| Trip.js:128-137 | Flow defects: Wrong values with edge cases. | low | jimit | Issue #808 |
| Trip.js:40 | onClick calls function that returns something without assigning anything | med | frankyg | Issue #804 |
| Trip.js:264 | One line Function is only called once and can be replaced/removed | low | frankyg | Issue #807 |
| Trip.js:116 | Toggle function is never called and can be removed | low | frankyg | #Issue #810 |
| Trip.js:54 | Search function returns 400 (Bad Request) when empty | med | kc7 | Issue #809 |
| Trip.js:246 | Function just calls another function logic can be condensed | low | kc7 | Issue #811 |
| Trip.js:180 | Out of bounds error check not handled | med | smunoz | Issue #813 |
| Trip.js:180 | Statement can be simplified | low | smunoz | Issue #815 |
| Trip.js:248-262 | Search function not working | high | smunoz | Issue #817 |
| Trip.js:135-137 | No checking or validation of places in array | low | jakebart | Issue #812 |
| Trip.js:198-200 | ButtonList only used here, other buttons do not use the array for labels etc. | low | jakebart | Issue #814 |
| Trip.js:180 | Function not needed, could be a boolean statement in function block where InputCheck is called | low | jakebart | Issue #816 |
