import React from "react";

export function SListArrayHelper(Arr){
    return (
        Arr.map((element, index) => (<div key={index}>{element}</div>))
    );
}

export function modifyText(){
    return (
        <p>
            Create a trip!<br/>
            - Toggle the trip manager on/off to start recording places via mouse clicks, or input coordinates / locations in the search bar and add place<br/><br/>
            - Re-sort or remove a place <br/>
            - Modify the trip under 'Modify' button <br/>
            Add input(s) separated by ',' at the top and select an action<br/>
            - Add different trips<br/>
            - Save / Load a trip<br/>
            - Select trip and click distance for round trip distance
        </p>
    );
}