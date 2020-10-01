# Sprint 2 - *t10* - *tech10*

## Goal
### Show me the distance

## Sprint Leader: 
### *Jake Barth*

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests for Master are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

- v2 protocol: This epic will add supported requests to our config, update request version and add both distance and find types. The distance type will allow the user to obtain the distance between a pair of geographical locations. The find type will allow the user to get a list of geographical locations.
- Where am I?: This epic will carry out tasks that will provide the user to view their current location. It will also allow the user to return to their current location after they have changed their map view.
- Where is?: This epic will focus on tasks that will allow the user to see their location on map using longitude and latitude. It will also allow them to search for a place by typing or pasting a string that provides longitude and latitude.
- Find Distance: The user will have the option to specify two geographical locations using the same or different means and calculate the distance between those two locations. For the user's visualization there will be a line drawn between the two locations on the map.
- Find Places: The user will have the option to search places to visit using names and municipalities around the world and allow the selection of one place to visit from a short list of relevant places.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *5* |
| Tasks |  *22*   | *22* | 
| Story Points |  *41*  | *41* | 

- The team's ability to complete the planned tasks/story points based on the previous sprint result is beyond sufficent. The team will use integration methods that will allow each memeber to work efficiently and in a timely manner. The team shares a high confidence to perform well during this sprint. Reflection will be done in regards to the retrospective from sprint 1 and the team will make reasonable attempts to complete any changes.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *09/14/20* | *0* | *4* | *none* |
| *09/15/20* | *1* | *5* | *none* |
| *09/16/20* | *3* | *4* | *none* |
| *09/18/20* | *10* | *5* | *none* |
| *09/21/20* | *11* | *5* | *none* |
| *09/23/20* | *16* | *5* | *none* |
| *09/25/20* | *16* | *5* | *none* |
| *09/28/20* | *16* | *5* | *none* |
| *09/29/20* | *20* | *2* | *none* | 
| *09/30/20* | *22* | *0* | *none* |


## Review

### Epics done  

- v2 protocol: Added supported find types and returned and received desired types and wrote tests for our implementation. Additionally computed and returned and received distances from server to the client side. Also updated the request version to 2 and added needed requests to our config.
- Where am I?: Added functionality to allow user to view their current location once the app starts and allowed the user to return to the same place after moving the map around. Unique markers were also added to distinguish the user's location.
- Where is?: A search bar was added to the map to allow a user to enter coordinates in latitude and longitude where coordinates would be parsed and a marker would show at the user specified location.
- Find Distance: From two user specified locations, the client drew a line and the server returned the distance between the specified points. Markers were added to each end of the line to aid with user visualization and the user can also click on the map to specify points.
- Find Places: Using the search bar, users were also given the choice to specify a name of place which would be shown on the map using the same technique used for the "Where is?" epic. Places were also suggested to the user with a drop-down menu and search input was given to the server to find in a database. 

### Epics not done 

### What went well

- The team finsihed all the epics and tasks
- All members shared the same drive and attention to detail throughout the entire sprint
- Issues and bugs were dealt with as a team and didn't pose as a hindrance to completion of epics
- Communication was effective between members and meetings were productive

### Problems encountered and resolutions

- Draw line task caused an issue with tests in jest, taking about a week to resolve by ignoring test cases in jest pertaining to svg rendering
- Lifting the state on the client side was tricky to figure out and caused a back-up of a couple days resolved by re-reading documentation countless times
- mysqldump syntax was difficult to understand and work with with resolution derving from seprating test cases between Travis and server tests
- Client testing posed numerous obstacles to grasping concepts resolved by studying documentation heavily

## Retrospective

### What we changed this sprint

- Meetings were spent focusing on resolving issues and completing tasks in the most effecient and effective manner psossible
- More inter-meeting team meetings with groups of two or three working on tough road-blocks 
- Longer meetings for tasks and less focus on logistics as comfort with given tools increased
- Members specialized in either client or server-side tasks allowing each member to help eachother more effectivly

### What went well

- Meetings were productive and members shared strengths and abilities with others when needed
- Members were able to work with eachothers schedules to find time to work together; sometimes at obsecure hours
- Team is starting to learn about eachother and everyone is grasping parts of the project's code exceptionally well

### Potential improvements

- Increased diversity in task assignment between client and server-side tasks

### What we will change next time

- More "break-out groups" to share specilized knowledge with different members 
