# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *WorldMarkers.js (1-190), Atlas.js (1-245)* |
| Meeting | *12/04/20, 1:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jimit Bhalavat | 40 mins |
| Jake Barth | 40 mins |
| Kyle Cummings | 40 mins |
| Sean Munoz | 30 mins |
| Frank Gansukh | 33 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:182-204 | Multiple if/else block violates Coding Best Practices and causes Data Faults | low | jimit | Issue #1098 |
| Atlas.js:238-244 | Redundant function, can be condensed (causes Interface Faults) | low | jimit | Issue #1100 |
| WorldMarkers.js:157-159 | Loop uncertain to terminate causes Control Faults | low | jimit | Issue #1101 |
| WorldMarkers.js:9, 57 | Unnecessary global variable | low  | smunoz | |
| Atlas.js:152 | Unnecessary dropdown button | low | smunoz | |
| WorldMarkers.js:140 | For loop hardcoded | med | kc7 | |
| WorldMarkers.js:66-68 | Empty Funciton | low | kc7 | |
| WorldMarkers.js:157-158 | Data fault could be caused by uninitialized value | low | jakebart | Issue #1102 |
| WorldMarkers.js:140-142 | One line function "sliderChange" only called once | low | frankyg | |
| Atlas.js:118-120 | One line function "getMapZoom" only called once | low | frankyg | |
