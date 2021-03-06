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
| Epics | *4* | *3* |
| Tasks |  *27*   | *24* | 
| Story Points |  *57*  | *78* | 

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

- v3 Protocol: For this epic, the team added a trip to supported requests in config. It also added the trip type. This epic updates the requestVersion to 3. It modifies the find behavior when no match is specified.
- Build a Trip: This epic allows the user to create a trip with the support of an unlimited number of destinations. It allows the user to name the trip. The trip designer shows the round trip distance of their selected destinations. For better visualization, the trip is also displayed on the map. It shows an itinerary with leg and cumulative distances for the round trip. It allows the user to save the trip, along with the functionality of loading a save trip. Moreover, it allows the user to enter coordinates of different formats and also search for a place and adds their selected choice to the trip. The user can load a trip and also make changes to their existing trip allowing them to modify their destinations with multiple functionalities.
- Modify Trip: After the user develops a trip, this epic allows the user to select a new starting location while maintaining the order of the destinations. It allows the user to reverse the order of the destinations from the starting location. It also allows the user to reorder the destinations on their trip. It allows them to modify the trip by removing destinations of their choice. It allows the user to add notes to their trip and correct mistakes in the existing information for the trip. Added functionality is also compatible after the user loads a saved trip. 

### Epics not done 

- Filter Trip: This epic will allow the user to find destinations on their trip if the number of destinations grows on their trip. It will only display the desired places in the itinerary.

### What went well

* All members shared the same drive and attention to detail throughout the entire sprint.
* Issues and bugs were dealt with as a team and didn't pose as a hindrance to completion of epics.
* Communication was effective between members and meetings were productive.
* Availability of team members made it easier to finish the tasks and epics on time. 
* The design for the user interface went very well, and the API was rigorously tested and checked.

### Problems encountered and resolutions

* At first, the team struggled with client testing, but after some guidelines and talking to the TAs, the team now has a better understanding.
* The team also struggled with code climate issues, but the team got together and tried their best to find solutions.
* The team also struggled with the user interface and how will the client talk to the server with the new functionality, but solutions were found through constant dedication and communication with other team members.

## Retrospective

### What we changed this sprint

* Meetings were spent focusing on resolving issues and completing tasks in the most efficient and effective manner possible.
* Distributed the tasks equally and therefore all the team members understood all the aspects of the epics.
* Great team communication helped the team move through tasks and epics efficiently.
* Incremental work helped the team and also helped individual team members learn more and work through the tasks in a smooth manner.

### What went well

* Meetings were productive and members shared strengths and abilities with others when needed.
* Members were able to work with each other's schedules to find time to work together; sometimes at obscure hours.
* The team now has a better understanding of problems that were faced in Sprint 2. 
* The team rigorously tested the server using Postman and testing other student's test from the student repository.

### Potential improvements

* Work on client testing and try to refactor some of the functionalities from the current Sprint.
* Try to design thoroughly before starting to write code to ensure efficiency.
* Try to leave some buffer time, so if something doesn't go according to plan, the team can use that time to catch up with the plan.

### What we will change next time

* Learn from mistakes made in Sprint 3.
* Try to finish tasks and epics in a timely manner.
* Try to visualize edge cases and write tests for those before starting to write code. 
