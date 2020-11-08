# Sprint 4 - *T10* - *tech10*

## Goal
### Shorter Trips!
## Sprint Leader
### *Kyle Cummings*


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style=, etc.).

### Clean Code
* Technical Debt Ratio less than 5% (A).
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.
* Code coverage greater than 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
* v4 protocol: This epic will update the request version to four. It will add a coordinate element to the places. This epic will also add filters to config and narrow to find. This will also add functionality of response to trip.
* Filter Search: This epic will introduce functionality to allow the user to filter their search to specific categories. This includes filters like region and country. Overall this will allow the user to receive a list of more customized places and shorten the overall list to search. 
* Shorter: This epic will allow the user to create a shorter overall trip while still visiting the same destinations. 
When the user uses any trip functionality the time the user waits till the action is complete will be less than one second. 
Provide better results using user concurrency which will also reduce overall computation time. 
* User Experience: This epic will simplify the overall user experience. This will be done by giving the user information only when the user needs it. Using hamburgers and other methods will reduce clutter and allow the user to view information on the website easier. We will verify intuitive functionality by getting opinions from outside sources.
* Feeling Lucky?: This epic will allow the user to get a place to visit that is suggested by the system. It will add that location to the current trip and calculate distance accordingly.
 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *21*   | *count* | 
| Story Points |  *48*  | *sum* | 

* The team's ability to complete the planned tasks/story points based on the previous sprint result is beyond sufficent. The team will use integration methods that will allow each memeber to work efficiently and in a timely manner. The team shares a high confidence to perform well during this sprint. Reflection will be done in regards to the retrospective from sprint 3 and the team will make reasonable attempts to complete any changes.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/27/2020* | *0* | *5* | *None* | 
| *10/28/2020* | *6* | *5* | *None* | 
| *10/30/2020* | *11* | *3* | *None* | 
| *11/02/2020* | *12* | *5* | *None* | 
| *11/04/2020* | *12* | *5* | *None* | 
| *11/06/2020* | *19* | *4* | *None* | 


## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
