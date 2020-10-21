# Sprint 3 - *T10* - *tech10*

## Goal
### Build a trip!

## Sprint Leader: 
### *Jimit Bhalavat*


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

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

- v3 Protocol: For this epic, the team will add trip to supported requests in config. It also adds the trip type. This epic will update the requestVersion to 3. It will also modify the find behavior when no match is specified.
- Build a Trip: This epic will allow the user to create a trip with support of unlimited number of destinations. It will also allow the user to name the trip. The user will be shown the round trip distance of their selected destinations. For better visualization, the trip will be displayed on the map. It shows an itinerary with leg and cumulative distances for the round trip. It will also allow the user to save the trip, along with the functionality of loading a save trip.
- Modify Trip: After the user develops a trip, this epic will allow the user to select a new starting location while maintaining the order of the destinations. It will allow the user to reverse the order of the destinations from the starting location. It will also allow the user to reorder the destinations in their trip. It will allow them to modify the trip by removing destinations of their choice. It will also allow the user to add notes to their trip and correct mistakes in the existing information for the trip.
- Filter Trip: This epic will allow the user to find destination in their trip if the number of destination grows in their trip. It will only display the desired places in the itinerary.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *4* | *count* |
| Tasks |  *27*   | *count* | 
| Story Points |  *57*  | *sum* | 

- The team's ability to complete the planned tasks/story points based on the previous sprint result is beyond sufficent. The team will use integration methods 
that will allow each memeber to work efficiently and in a timely manner. The team shares a high confidence to perform well during this sprint. 
Reflection will be done in regards to the retrospective from sprint 2 and the team will make reasonable attempts to complete any changes.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/05/20* | *0* | *5* | *none* | 
| *10/07/20* | *7* | *5* | *none* | 
| *10/09/20* | *7* | *5* | *none* | 
| *10/12/20* | *7* | *5* | *none* | 
| *10/14/20* | *11* | *4* | *none* | 
| *10/16/20* | *16* | *5* | *none* |
| *10/19/20* | *23* | *4* | *none* |
| *10/21/20* | *24* | *0* | *none* |

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
