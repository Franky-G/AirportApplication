# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](https://github.com/csucs314f20/t10/blob/master/reports/images/BaseArchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem .
* Server SQL .
* Server concurrency.


### User Interface
![base](https://github.com/csucs314f20/t10/blob/master/reports/images/BaseUserInterface.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The blue areas highlight the actions that may be performed.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the map places a marker.
Whenever a user clicks on the map, the client should display a marker with latitude and longitude at that location.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking on the team name should tell me more about the team.
Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.
The collapsible map should disappear so only the about or map are displayed.
A close button / icon in the top right corner of the about will close the about and return the map to display.
A simple toggle in state should be able to control this rendering.
The about page should contain the team name as a heading, but be otherwise blank in base. 

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, a Test button should appear and the server name should disappear.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.


### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

![base component hierarchy](https://github.com/csucs314f20/t10/blob/master/reports/images/BaseComponentHierarchy.png)

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

![class diagram](https://github.com/csucs314f20/t10/blob/master/reports/images/BaseClassDiagram.png)

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* RequestConfig is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* RequestHeader defines the basic components of all requests.

The classes in orange represent the external libraries used by the application.
Often there are several related classes but we've listed only one to simplify the diagram.
* GSON converts a JSON string into a Java object instance.
* Spark provides the necessary web support for our MicroServer.
* JSON provides libraries to manipulate JSON objects using the JSON Schema libraries.
* Logger provides a centralized logging facility used in all of the application classes.


# Sprint 1

### User Interface
![UserInterface](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint1UserInterface.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to is shown when the info button is clicked.

#### World Map
When the user drops a pin on a location the pin is the center of the map, and the location is also zoomed in (Part of Where Am I? epic). 

#### Footer
The connection status logo is changed and a new logo is displayed when the user makes a successful connection, and a not connected logo appears for unsuccessful connection. The footer also displays the name of the server the user is connected to. There is a buton for more information that displays server name, request type, and request version. The info button also displays an editable URL for the user to change the server. A save button lightens up when the user makes a successful connection, otherwise the usercan continue to edit the URL.

#### Header
The header displays the team name. Clicking on the header displays more information about the About page. The About page has the team's mission statment and also displays team information where there is a short bio, image, and contact information for all the teammates.

### Component Hierarchy
![Sprint1 Component Hierarchy](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint1ComponentHierarchy.png)

* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team along with a mission statement.

### Class Diagram
![Sprint1 Class Diagram](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint1ClassHierarchy.png)

The class diagram is the same as the Base for Sprint 1.

# Sprint 2

### User Interface
![User Interface Sprint 2](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint2UserInterface.png)

#### Distance
This feature will allow the user to enter two sets of geographical coordinates and will result in the calculation of the distance between those two locations. For better visualisation, this feature will draw a line between these two locations.

#### Find Places
This feature will allow the user to find places by names and municipalities around the world and display a short list of relevant places, and will allow the user to select one.

#### Where is?
This feature will allow the user to see a location on the map using latitude and longitude. The user is allowed to enter any format of the coordinates, and the map will convert them and show the user the location.

#### Where am I?
This feature will allow the user to look at their current location and there will be a home button present in the left of the map, which will allow the user to return to their current location if they have scrolled away to look at different places on the map. 

### Component Hierarchy
![Component Hierarchy](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint2ComponentHierarchy.png)

* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map, it also allows the user to calculate distance between two sets of geographical coordinates, along with searching of places by names and municipalities around the world, and it also allows the user to enter geographical coordinates and search for that place.
* About renders information about the team, along with team's mission statement and short bios for each teammember, along with their contact inforamtion. 
* Helper Functions renders the search buttton on the screen and as soon as the user clicks the button, it opens up a box which allows the user to work on the above options. HelperFunctions also sends server request for Distance and Find.

The state is located in Footer and Atlas. The props passed to child components are:
* About: closePage
* Footer: serverSettings and processServerConfigSuccess
* Header: toggleAbout

### Class Diagram
![Class Diagram](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint2ClassDiagram.png)

The changes in class diagram for Sprint 2 are:
* Config: objects allow the server to provide configuration information to the client.
* Distance: objects allow the client to request the distance between two geographic locations.
* Find: objects allow the client to provide the user a list of possible destinations based on some criteria.

For Sprint 2, it also adds request for Distance and Find in the Microserver.

# Sprint 3

### User Interface
![User Interface Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint3UserInterface.png)

#### Build a Trip
This option will allow the user to create a trip with support for an unlimited number of destinations. It also allows the user to name the trip. For the user's convenience, the trip will be displayed on the map along with round trip distance. A trip can be created by adding coordinates via the search bar and airports also via the search bar. The user can also use our 'record' functionality to record a trip by map clicks. All of these methods to add locations are interchangeable with each trip. 
 

#### Modify a Trip
This option will allow the user to modify a saved trip. It will allow the user to chose a different starting location while maintaining the order of the destinations. It will also allow the user to reverse the order of the destinations from the starting location. It will also allow the user to reorder individual destinations. It will allow the user to remove destinations, along with the functionality of adding notes to the trip, also correct their mistakes on the existing information. Allows the user to add an entire trip using a valid json load file. An entire trip can be saved and loaded from the save resulting in a new trip. 

### Component Hierarchy
![Component Hierarchy Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint3ComponentHierarchy.png)

* App renders the major components on the screen.
* About renders information about the team, along with team's mission statement and short bios for each teammember, along with their contact information. 
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map. The other functionality are:
  * FleIO is used to load and save a trip.
  * Find allows the user to find places along with searching of places by names and municipalities around the world. The user can make a selection and then the map drops a marker at that position.
  * Radio Buttons create buttons for the find, distance, and where is functionality.
  * Search Module works to find distance along with the coordinate parser, which allows the user to enter multiple formats of coordinates. It also adds the search bar for distance where the user inputs the coordinates.
  * Where Is allows the user to enter coordinates of multiple formats and as soon as the user click the "Go To" button, the map drops a marker at that coordinates.
  * World Markers helps the other functionality of atlas to drop markers at various positions and also helps with drawing the polyline on the map.
* Trip will allow the user to build a trip and modify a trip. The functionality of each of this parts is described above. This functions will allow the user to build a trip with support of unlimited destinations, modify their existing trip with multiple functionality. 
  * Trip Object helps the Trip funcitonality with modifying a trip and also helps to build the trip.

The state is located in Footer and Atlas. The props passed to child components are:
* About: closePage
* Footer: serverSettings and processServerConfigSuccess
* Header: toggleAbout

### Class Diagram
![Class Diagram Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint3ClassDiagram.png)

The changes in class diagram for Sprint 3 are:
* Config: objects allow the server to provide configuration information to the client.
* Distance: objects allow the client to request the distance between two geographic locations.
* Find: objects allow the client to provide the user a list of possible destinations based on some criteria.
* Trip: objects allow the client to build a trip with support of unlimited destinations.

For Sprint 3, it adds request for Trip in the Microserver.

# Sprint 4 

### User Interface
![User Interface Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint4UserInterface.png)

#### Filter Search
This epic will introduce functionality to allow the user to filter their search to specific categories. This includes filters like region and country. Overall this will allow the user to receive a list of more customized places and shorten the overall list to search.

#### Shorter
This epic will allow the user to create a shorter overall trip while still visiting the same destinations. When the user uses any trip functionality the time the user waits till the action is complete will be less than one second. Provide better results using user concurrency which will also reduce overall computation time.

#### User Experience
This epic will simplify the overall user experience. This will be done by giving the user information only when the user needs it. Using hamburgers and other methods will reduce clutter and allow the user to view information on the website easier. We will verify intuitive functionality by getting opinions from outside sources.

#### Feeling Lucky?
This epic will allow the user to get a place to visit that is suggested by the system. It will add that location to the current trip and calculate distance accordingly.

### Component Hierarchy
![Component Hierarchy Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint3ComponentHierarchy.png)

* App renders the major components on the screen.
* About renders information about the team, along with team's mission statement and short bios for each teammember, along with their contact information. 
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map. 
  * FleIO is used to load and save a trip.
  * Find allows the user to find places along with searching of places by names and municipalities around the world.
  * Search Module works to find distance along with the coordinate parser, which allows the user to enter multiple formats of coordinates.
  * Where Is allows the user to enter coordinates of multiple formats and as soon as the user click the "Go To" button, the map drops a marker at that coordinates.
* Trip will allow the user to build a trip and modify a trip. This functions will allow the user to build a trip with support of unlimited destinations, modify their existing trip with multiple functionality. 
 

### Class Diagram
![Class Diagram Sprint 3](https://github.com/csucs314f20/t10/blob/master/reports/images/Sprint3ClassDiagram.png)

The changes in class diagram for Sprint 4 are:
* Config: The filters element contains two properties. The type property identifies the different kinds of places available. The where property identifies locations by geographic elements.
* Distance: objects allow the client to request the distance between two geographic locations.
* Find: The narrow element contains filters to apply to the find request on the server.
* Trip: Response is a string which corresponds to a numeric value for the number of seconds allowed for optimization. An optional coordinates may provide a string containing coordinates in a different format other than decimal degrees. 

# Sprint 5
