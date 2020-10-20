# Inspection 02 - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.js (56-233), SearchModule.js (28-174).* |
| Meeting | *10/20/20, 5:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jimit Bhalavat | 55 mins |
| Jake Barth | 45 mins |
| Kyle Cummings | 40 mins |
| Frank Gansukh | 30 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:103-111 | searchREF to cause Interface Faults | low | Jimit B. | |
| Atlas.js:186-203 | Multiple if/else blocks causes Exception Faults | low | Jimit B. | |
| SearchModule.js:74-81 | event.target causes Data Faults when no event specified | low | Jimit B. | |
| Atlas.js:215-219 | recordingTrip state variable is int, used as bool. Case where recordingTrip>1? | low | Jake B. | |
| Atlas.js:113-115 | State is set no matter the value. Could cause logical issues | low | Kyle C | |
| SearchModule.js:163-178 | Values passed in are never being checked for null or invalid. Results in a setState of undefined | low | Kyle C | |
| Atlas.js:233 | Function is only called once. Thus removing the need for a one line function | low | Frank G | |
| SearchModule.js:163 | Server request does not check whether or not whats being sent is violating schema specifications | med | Frank G | |
