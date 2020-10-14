
# Inspection Checklist for t10

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?
* Are all data structures used initialized properly?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?
* Do all functions serve a unique purpose?
* Are all functions serving their purpose in the best way?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Exception faults
* Have all possible error conditions been considered?

### Coding Best Practices
* Ensure there is no hard coding. Use constants/configuration values.
* Avoid multiple if/else blocks.
* Use framework features or react components whenever possible, instead of writing custom code.
* Comment as much as needed but not more. 
* Make sure to follow proper naming convention and guidelines, and make sure there are meaningful names.

### Test Coverage and Test Quality
* Is every code block testable?
* Has said code block been tested/covered?
* Are they testing the right thing?
* Are the tests targetting the intended functionality?

### Arrays
* Are there any off-by-one errors in array indexing?
* Can array indexes ever go out-of-bounds?
* Is a constructor called when a new array item is desired?
* Are array declarations syntactically correct?
* Are the row and column being indexed in the right order for a 2D array

