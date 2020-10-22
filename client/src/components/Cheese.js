import React from "react";

export function SListArrayHelper(Arr){
    return (
        Arr.map((element, index) => (<div key={index}>{element}</div>))
    );
}