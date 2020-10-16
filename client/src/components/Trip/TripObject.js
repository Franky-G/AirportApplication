import React from "react";

export default class TripObject {
    constructor(name, places, note) {
        this.name = name;
        this.places = places;
        this.note = note;
    }

    setName(newName){
        this.setState({name: newName})
    }

    setPlaces(array){
        this.setState({places: array})
    }

    setNote(string){
        this.setState({note: string})
    }

    positionUp(index){
        let array = this.state.places.slice();
        let swap = array[index - 1]
        array[index - 1] = array[index]
        array[index] = swap
        this.setState({places: array})
    }

    positionDown(index){
        let array = this.state.places.slice();
        let swap = array[index + 1]
        array[index + 1] = array[index]
        array[index] = swap
        this.setState({places: array})
    }

    modify(name, places, note){
        this.setState({name: name, places: places, note: note})
    }

    modifyStart(index){
        let array = this.state.places.slice();
        let start = array[index];
        array.splice(index,1);
        array.unshift(start);
        this.setState({places: array});
    }

    removePlace(index){
        let array = this.state.places.slice();
        array = array.splice(index, 1);
        this.setState({places: array});
    }

    removeNote(){
        this.setState({note: ""})
    }

    resetPlaces(){
        this.setState({places: []})
    }

    reversePlaces(){
        let array = this.state.places.slice();
        array.reverse();
        this.setState({places: array})
    }

    reversePlacesAt(index){
        let end = this.state.places.length
        let array = this.state.places.slice();
        while(index < end){
            let swap = array[end];
            array[end] = array[index];
            array[index] = swap;
            ++index;
            --end;
        }
        this.setState({places: array})
    }
}