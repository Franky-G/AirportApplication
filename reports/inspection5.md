# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Optimization.java (1-148), Find.js (1-251)* |
| Meeting | *11/20/20, 3:00 PM MST, Discord* |
| Checklist | *Inspection [Checklist](https://github.com/csucs314f20/t10/blob/master/reports/checklist.md) for T10* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Jake Barth | 35 mins |
| Jimit Bhalavat | 40 mins |
| Kyle Cummings | 35 mins |
| Frank Gansukh | 37 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Find.js:161-165 | Statement can be condensed | low | jakebart | Issue #1033 |
| Find.js:8-30 | Repeat hex color strings in styles | low | jakebart | Issue #1036 |
| Optimization.java:128-147 | Code cognitive complexity | low | jakebart | Issue #1037 |
| Optimization.java:53-65 | All possible error conditions not considered causes Exception Faults | low | jimit | Issue #1032 |
| Optimization.java:135-143 | Multiple control statements causes Control Faults | low | jimit | Issue #1034 |
| Find.js:185-200 | Multiple if/else blocks (can be condensed) causes Interface Faults | med | jimit | Issue #1035 |
| Optimization.java:50-52 | Var names should be changed. Meaning isn't clear follow best practices | low | kc7 | Issue #1042 |
| Optimization.java:83-85 | Var tempDist is never used consider refactoring | low | kc7 | Issue #1043 |
| Optimization.java:30 | Var assignment is redundant. Follow best practices and refactor | low | kc7 |  Issue #1044 |
| Find.js:160 | Var "numFound" only called once within function.. thus redundant | low | frankyg | Issue #1047 |
| Find.js:161 | Vat "maxFound" only called once withing function.. thus redundant | low | frankyg | Issue #1048 |
| Optimization.java:132 | Primitive int "distDelta"'s scope could be lowered and declared in the nested for loop | low | frankyg | Issue #1049 |
