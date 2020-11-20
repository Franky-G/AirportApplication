
export default class TripObject {
    constructor(name, places, note) {
        this.name = name;
        this.places = places;
        this.note = note;

        this.positionUp = this.positionUp.bind(this);
        this.positionDown = this.positionDown.bind(this);
    }

    addPlace(latLng, index, note){
        this.places.push([latLng, index, note]);
    }

    setName(newName){
        this.name = newName;
    }

    setPlaces(array){
        this.places = array;
    }

    setNote(string){
        this.note = string;
    }

    setPlaceNote(string){
        let regex = /,\s*/
        let splitArray = string.split(regex)
        if((splitArray[1])< this.places.length)
        this.places[splitArray[1] - 1][2] = splitArray[0];
    }

    positionUp(index){
        if(index === 0){
            return;
        }
        let array = this.places;
        let swap = array[index - 1]
        array[index - 1] = array[index]
        array[index] = swap
        this.places = array;
    }

    positionDown(index){
        if(index === this.places.length - 1){
            return;
        }
        let array = this.places.slice();
        let swap = array[index + 1]
        array[index + 1] = array[index]
        array[index] = swap
        this.places = array;
    }

    modify(name, places, note){
        this.name = name;
        this.places = places;
        this.note = note;
    }

    modifyStart(index){
        let array = this.places.slice();
        let start = array[index - 1];
        array.splice(index - 1,1);
        array.unshift(start);
        this.places = array;
    }

    movePlace(string){
        let regex = /,\s*/
        let splitArray = string.split(regex)
        if(splitArray[0] < this.places.length && splitArray[1] <= this.places.length) {
            let array = this.places.slice();
            let element = array[splitArray[0] - 1]
            array.splice(Number(splitArray[1]), 0, element)
            array.splice(Number(splitArray[0] - 1), 1)
            this.places = array;
        }
    }

    removePlace(index){
        let array = this.places.slice();
        array.splice(index, 1);
        this.places = array;
    }

    removeNote(){
        this.note = ""
    }

    resetPlaces(){
        this.places = [];
    }

    reversePlaces(){
        let array = this.places.slice();
        array.reverse();
        this.places = array;
    }

    reversePlacesAt(index){
        let end = this.places.length - 1
        let array = this.places.slice();
        while(index - 1 < end){
            let swap = array[end];
            array[end] = array[index - 1];
            array[index - 1] = swap;
            ++index;
            --end;
        }
        this.places = array;
    }

    filterPlaces(regExpression){
        if(regExpression === ""){
            return this.places;
        }
        console.log(regExpression)
        let regexArray = [];
        for(let i = 0; i < this.places.length; ++i){
            if(this.places[i][2].toLowerCase().includes(regExpression.toLowerCase())){
                regexArray.push(this.places[i])
                continue;
            }
            if(this.places[i][0].lat.toString().includes(Number.parseFloat(regExpression).toString()) || this.places[i][0].lng.toString().includes(Number.parseFloat(regExpression).toString())){
                regexArray.push(this.places[i])
                continue;
            }
            if(this.places[i][0].lat.toString().includes(regExpression) || this.places[i][0].lng.toString().includes(regExpression)){
                regexArray.push(this.places[i])
            }
        }
        return regexArray;
    }
}