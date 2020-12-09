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
| Epics | *6* | *6* |
| Tasks |  *16* | *16* |
| Story Points | *37* | *56* |

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
| *12/09/20* | *16* | *0* | *none* |


## Review

### Epics done 

* File Formats: This epic will allow the user to save their trip in multiple formats in addition to json. The supported formats will be CSV format for loading into spreadsheets, KML format for loading into Google tools, SVG format for browser and graphic tools.

* Place Details: This epic will allow the user to know more than just latitude/longitude when they see where they are. This epic will use reverse geocoding to convert latitude/longitude to a textual description.

* Place Display: This epic will allow the user to know more about the places when they make a selection. Region, country and other useful information will be displayed.

* Filter Trip: This epic will allow the user to search for places in their trip when the list of destinations grows. Only desired places are displayed.

* Markers: This epic will allow the user to choose from an assortment of markers and lines for the trip. The markers will be different images, sizes, colors and lines will be different styles, width, colors.

* Maps: This epic will allow the user to choose from a selection of different map backgrounds, such as satellite, topographic, open street map black and white, and the default map is open street map.

### Epics not done 
    
*Finished all Epics*
 
### What went well
    
* All members shared the same drive and were attenative towards completing the tasks given to them.
* Issues and bugs were dealt with as a team and didn't pose as a hindrance to completion of epics. The defects were handled quickly and effectively
* Communication was effective between members and meetings were productive. Everybody worked together on issues sometimes outside meetings.
* Availability of team members made it easier to finish the tasks and epics on time. Most teammates were available throughout the day.
* The design for the user interface went very well, and the API was rigorously tested and checked. The ui looks clean, and the api handles a variety of inputs.

    
### Problems encountered and resolutions

* One of the main problems came from code climate and the restrictions on files. Namely the line limit and the number of methods in a file where a major impedement toward our solutions. We utilized good coding techniques to address the code climate issues.
* The structure of our webpage was also an impedement, mainly from a testing standpoint. The use of a parent child relationship caused a huge hinderance of client testing, and actually prevented us from testing a large part of some files. We attempted to test as much as we could regardless of the impedement.
* Handling promises from asyncronous functions were very challenging and we did not get a chance to resolve this issue. However we did get the reverse geocoding done on some level. 

## Retrospective

### What we changed this sprint
  
* Meetings were effective and efficient. Everyone was on the same page and we divided the tasks accordingly.
* All team members had some experience interacting with another team member's issue, creating a joint venture on new issues.
* Great team communication helped the team move through tasks and epics efficiently.
* Working more individually, team members were more autonomous and self motivated this sprint, working outside normal meeting times

### What went well

* Our ability to presist and conquer, as we tackled almost all of the epics and tasks for the entire class. 
* The team performed excellently with each other and produced high quality products for the stake-holders
* Our ability to tackle tasks together was a great assest to the success of the team.
* Finishing tasks ahead of schedule to account for defects and bugs gave us ample time to get features working correctly.

### Potential improvements

* Organizing meetings to fit the team's hectic schedule. Many team members had conflicting obligations during this sprint due to other classes/work etc.
* Creating a more complete design before implementation, as some of the design was created on the go. The design did become successful.
* Normalizing our commits, reviews could have been more comprehensive

### What we will change next time

* Approach from a top-down rather than a bottom-up approach
* Utilize other teams and their implementations
* Celebrate our accomplishments more
