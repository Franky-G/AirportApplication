# Sprint 5 - *T10* - *Tech10*

## Goal
### User Experience

## Sprint Leader
### *Sean Munoz*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
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

* File Formats: This epic will allow the user to save their trip in multiple formats in addition to json. The supported formats will be CSV format for loading into spreadsheets, KML format for loading into Google tools, SVG format for browser and graphic tools.
* Place Details: This epic will allow the user to know more than just latitude/longitude when they see where they are. This epic will use reverse geocoding to convert latitude/longitude to a textual description. The additional information will be displayed on the marker as well as the trip itinerary.
* Place Display: This epic will allow the user to know more about the places when they make a selection. Region, country and other useful information will be displayed along with links to information about places.
* Filter Trip: This epic will allow the user to search for places in their trip when the list of destinations grows. Only desired places are displayed.
* Markers: This epic will allow the user would to choose from an assortment of markers and lines for the trip. The markers will be different images, sizes, colors and lines will be different styles, weights, colors.
* Maps: This epic will allow the user to choose from a selection of different map backgrounds, such as satellite or topographic.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *count* |
| Tasks |  *16*   | *count* | 
| Story Points |  *37*  | *sum* | 

* The team's ability to complete the planned tasks/story points based on the previous sprint result is beyond sufficent. The team will use integration methods that will allow each memeber to work efficiently and in a timely manner. The team shares a high confidence to perform well during this sprint. Reflection will be done in regards to the retrospective from sprint 4 and the team will make reasonable attempts to complete any changes.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *11/16/20* | *0* | *5* | *none* |
| *11/18/20* | *2* | *5* | *none* |
| *11/20/20* | *2* | *5* | *none* |
| *11/30/20* | *7* | *5* | *none* |
| *12/02/20* | *7* | *5* | *none* |
| *12/03/20* | *9* | *4* | *none* |
| *12/04/20* | *9* | *4* | *none* |
| *12/07/20* | *11* | *5* | *none* |

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
