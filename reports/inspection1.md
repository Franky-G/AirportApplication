# Inspection 01 - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Trip.js (33-267), WhereIs.js (19-64), RadioButtons.js (16-51).* |
| Meeting | *10/15/20, 5:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jimit Bhalavat | 60 mins |
| Kyle Cummings  | 45 mins  |
| Jake Barth  | 45 mins  |
| Frank Gansukh | 40 mins |
| Sean Munoz | 40 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| WhereIs.js:39-64 | Function not serving unique purpose. | med | Jimit B. | Issue #524 |
| RadioButtons.js:24-40 | Code block not tested. | med | Jimit B. | Issue #526 |
| Trip.js:75-84 | Exception Fault: Case with 0 places in trip not considered. Some Hard coding. | low | Jimit B. | Issue #529 |
| Trip.js.js:48-59 | For loop not certain to terminate with edge cases. | low | Jimit B. | Issue #533 |
| Trip.js:139| Function name not self explanatory. | low | Kyle C. | Issue #525 |
| Trip.js:25| Name of 'myclass' gives no information. | low | Kyle C. | Issue #528 |
| Trip.js:6| Commented style not used. | low | Kyle C. | Issue #530 |
| Trip.js:49 | Variable initialization complicated/messy. | low | Jake B. | Issue #531 |
| Trip.js:249-259 | Readability and variable names. | low | Jake B. | Issue #539 |
| Trip.js:214 | Commented out code. | low | Jake B. | Issue #536 |
| WhereIs.js:28-29 | Hard coded names in logic blocks. | low | Jake B. | Issue #538 |
| Trip.js:272 | Function not tested | low | Frank G. | Issue #532 |
| Trip.js:249-259 | Identical functions causing a duplication issue | med | Frank G. | Issue #527 |
| Trip.js:214 | Commented code out of place | low | Frank G. | Issue #536 |
| Trip.js:265 | removeAtrip does not remove correctly | high | Sean M. | Issue #541 |
| Trip.js:223 | Duplicate functionality for renderSearchList and renderTripList  | med | Sean M. | Issue #543 |
| Trip.js:256 | removeAPlace and removeATrip similar functions | low | Sean M. | Issue #544 |
| Trip.js:79 | distanceArr state variable assigned but not used | low | Sean M. | Issue #545 |
