# Inspection 04 - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.js (1-234)* |
| Meeting | *11/09/20, 2:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jimit Bhalavat | 45 mins |
| Jake Barth | 40 mins |
| Frank Gansukh | 32 mins |
| Kyle Cummings | 30 mins |
| Sean Munoz | 30 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:113-117 | Array upper bound equals size causes Data Faults | low | jimit | Issue #907 |
| Atlas.js:188-206 | Multiple if/else block causes Interface Faults | low | jimit | Issue #908 |
| Atlas.js:225-234 | All possible error conditions not considered | low | jimit | Issue #909 |
| Atlas.js:49 | hasUserLocation is boolean but initialized as null | low | jakebart | Issue #917 |
| Atlas.js:198-202 | Multiple logic block, could cause issues | low | jakebart | Issue #918 |
| Atlas.js:171-182 | Styles for elements are hard-coded, clean with comments or data structure | low | jakebart | Issue #921 |
| Atlas.js:208-210 | one line function "setDropdown()" only called once, can be replaced | low | frankyg | |
| Atlas.js:236-238 | one line function "setSearchTextIsEmpty(state)" only called once, can be replaced, also... when it is called, the parameter is missing 'state' | med | frankyg | |
| Atlas.js:152-158 | function "openTrip()" not called in Atlas, may not be an issue if it's called in other files | low | frankyg | |
| Atlas.js:198-202 | If not tested when this.state.tripRecord === true | low | kc7 | Issue #914 |
| Atlas.js:212-215 | setPrevLocationState() needs to be tested | low | kc7 | Issue #915 |
| Atlas.js:103 | Out of bounds check doesnt check all cases | low | smunoz | |
| Atlas.js:135-143 | Helper Home function making redundant calls that can be optimized | low | smunoz | |
