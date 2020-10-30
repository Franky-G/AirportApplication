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
| Frank Gansukh |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:269-272 | searchListArray with 0 elements to cause Data Faults. | low | jimit | |
| Trip.js:99-104 | for loop uncertain to terminate. (Check upper-bound of array) | low | jimit | |
| Trip.js:128-137 | Flow defects: Wrong values with edge cases. | low | jimit | |
| Trip.js:40 | onClick calls function that returns something without assigning anything | med | frankyg | |
| Trip.js.264 | One line Function is only called once and can be replaced/removed | low | frankyg | |
| Trip.js.116 | Toggle function is never called and can be removed | low | frankyg | |
