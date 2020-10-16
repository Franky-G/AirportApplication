import React, {Component} from "react";
import {Row, InputGroup, InputGroupAddon, PopoverHeader, PopoverBody, UncontrolledPopover, Button, ListGroupItem, ListGroup} from "reactstrap";
import Input from "@material-ui/core/Input";
import {sendServerRequest} from "../../utils/restfulAPI";
import FileIO from "../Atlas/FileIO"
import TripObject from "../Trip/TripObject"
// const searchListStyle = {margin: 0, padding: 8, height: "100%", width: 279, color: "#FFFFFF", zIndex: 1009, fontSize: 13, borderRadius: "3px 3px 3px 3px", border: "2px solid #1E4D2B", background: "#002b0c"}
const labelStyle = {opacity: 0.2, overflow:"hidden"}
const inputArray = [{width: 211, label: "Add Place", width2: 70, name: "searchPlaces"}, {width: 229, label: "Filter", width2: 50, name: "filter"}]
const placesAndTrips = [{height: 150, text: "Places"}, {height: 90, text: "Trips"}]
const buttonList = [{style: {position: "absolute", right: 10}, label: "Add Trip"},
                    {style: {position: "absolute", left: 80}, label: "Reset"}]
const loadSaveDistance = [{style: {position: "absolute", padding: 4, left: 10}, label: "Load"}, {style: {position: "absolute", padding: 4, left: 58}, label: "Save"}, {style: {position: "absolute", padding: 4, left: 108}, label: "Distance"}, {style: {position: "relative", padding: 4, left: 20, top: 30}}]

export default class SearchModule extends Component {
    constructor(props) {
        super(props);
        this.divClicked = this.divClicked.bind(this);
        this.addATrip = this.addATrip.bind(this);
        this.onClickCall = this.onClickCall.bind(this);
        this.state = {
            myClass: '',
            searchPlaces: "",
            filter: "",
            trips: [new TripObject("test", [L.latLng(40,-105), L.latLng(41,-105)], "test note")],
            distance: 0,
            distanceArr: null,
            stateIndex: 0,
        }
    }

    render(){
        return(
            <div>
                <FileIO {...this.state} ref={(ref) => this.FileIOREF=ref}/>
                {this.renderTripUI()}
            </div>
        );
    }

    addLoadSaveDistanceButtons(array){
        return(
            <div>
                <Button size="sm" style={array[0].style} onClick={() => this.FileIOREF.openModal()}> {array[0].label}</Button>
                <Button size="sm" style={array[1].style} onClick={() => this.getFormatForSave()}> {array[1].label} </Button>
                <Button size="sm" style={array[2].style} onClick={() => {this.formatTripDistance()}}> {array[2].label} </Button>
                <p style={array[3].style}>Total Trip Distance: {this.state.distance} Mile(s)</p>
                </div>
            ); }

    addATrip(){
        let tripsArray = this.state.trips.slice();
        tripsArray.push(new TripObject("", [], ""))
        console.log(tripsArray)
        this.setState({trips: tripsArray})
    }

    addASpace(){ return( <Row style={{height:5}}/>);}

    addInputField(array){
        return(
            <div><InputGroup>
                    <Input className="justify-content-center" name={array.name} style={{backgroundColor: "#FFFFFF", width: array.width, borderRadius: "3px 0 0 3px", border: "1px solid #FFFFFF", left: 27, height: 30, boxShadow: "1px 1px 1px 0 #000000", overflow: "hidden"}} onChange={() => this.updateInputState()}/>
                    <InputGroupAddon addonType="append"><Button style={{ background: "linear-gradient(#1E4D2B, #002b0c)", padding: 2, color: "#FFFFFF", borderRadius: "0 3px 3px 0", border: "1px solid #FFFFFF", left: 27, fontSize: 11, width: array.width2, boxShadow: "1px 1px 1px 0 #000000", overflow:"hidden"}} title="Add location">{array.label}</Button></InputGroupAddon>
                </InputGroup></div> ); }

    addPlaceOrDistance(array){
        return(
            <div><Row id="placePanel" className="justify-content-center">
                    <div className="tripBackdrop" style={{width:280, height: array.height, fontSize: 40}} ><label style={labelStyle} className="vertical-center justify-content-center" >{array.text}</label></div>
                </Row></div>
        );
    }

    addPlaceListItem(element, tripIndex){
        return(
            <div>
                <ListGroupItem id="searchListStyle" tag="button" title={this.state.trips[this.state.stateIndex].note} action onClick={(e) => {e.stopPropagation(); this.onClickCall(element, tripIndex)}}>
                    {this.state.trips[tripIndex].name}{element} | {this.state.trips[tripIndex].places[element].lat.toFixed(3)}{this.state.trips[tripIndex].places[element].lng.toFixed(3)}
                    <div className="vertical-center justify-content-center" style={{position: "absolute", right: 5, top: 5, width: 15, height: 15, backgroundColor: "#FFFFFF", color: "#000000", borderRadius: 5}}
                         onClick={(e) => {e.stopPropagation(); this.state.trips[tripIndex].positionUp(element); this.forceUpdate()}}> ^ </div>
                    <div className="vertical-center justify-content-center" style={{position: "absolute", right: 5, top: 22, width: 15, height: 15, backgroundColor: "#FFFFFF", color: "#000000", borderRadius: 5}}
                         onClick={(e) => {e.stopPropagation(); this.state.trips[tripIndex].positionDown(element); this.forceUpdate()}}> v </div>
                    <div className="vertical-center justify-content-center" style={{position: "absolute", width: 20, height: 20, right: 25, top: 10, backgroundColor: "#FFFFFF", color: "#000000", borderRadius: 5}}
                         onClick={(e) => {e.stopPropagation(); this.state.trips[this.state.stateIndex].modifyStart(element); this.forceUpdate()}}>S</div>
                </ListGroupItem>
            </div>
        );
    }

    addPlace(latLng){
        this.state.trips[this.state.stateIndex].places.push(latLng)
    }

    onClickCall(element, tripIndex){
        this.props.setWhereIsMarker(this.state.trips[tripIndex].places[element]);
        this.setState({index: tripIndex})
    }

    calculateTripDistance(latLngString){
        sendServerRequest({
            requestType: "trip",
            requestVersion: 3,
            options: {title:"My Trip", earthRadius: "3959.0"},
            places: latLngString
        }).then(distance => {
            let totalDistance = 0;
            let distances = distance.data.distances;
            for(let i = 0; i < distances.length; i++){ totalDistance += distances[i]; }
            this.setState({distance: totalDistance, distanceArr: distance.data.distances})
        });
    }

    divClicked() {
        if (this.state.myClass === '') { this.setState({myClass: 'coolclass'}) }
        else {this.setState({myClass: ''}) }
    }

    formatTripDistance() {
        let jsonStr = '{"places":[]}';let obj = JSON.parse(jsonStr);
        if (this.state.trips[this.state.stateIndex].places.length === 0) { this.setState({distance: 0}); return; }
        for(let i = 0; i < this.state.trips[this.state.stateIndex].places.length; i++) {
            let lat = this.state.trips[this.state.stateIndex].places[i].lat.toString();
            let long = this.state.trips[this.state.stateIndex].places[i].lng.toString();
            obj['places'].push({"name":"Trips","latitude":lat,"longitude":long});
        }
        let test = JSON.stringify(obj);
        test = test.slice(10,test.length-1);
        test = JSON.parse(test)
        this.calculateTripDistance(test);
    }

    getFormatForSave() {
        const fileContents = {
            requestType: "trip", requestVersion: 3,
            options: { title: "My Trip", earthRadius: 3959.0 },
            places: this.state.tripPlaces
        }
        const fileString = JSON.stringify(fileContents);
        this.FileIOREF.downloadFile(fileString, 'file.json', 'application/json')
    }

    renderPopover(){
        return( <div className="d-flex">
                <Button id="UncontrolledPopover"
                        style={{position: "absolute", margin: 0, padding: 0, color: "#1E4D2B", backgroundColor: "#C8C372",
                            width: 30, height: 30, borderRadius: 30, left:10, top: 15, border: "2px ridge #1E4D2B", zIndex: 1001}}>
                    ?
                </Button>
                <UncontrolledPopover trigger="focus" placement="bottom" target="UncontrolledPopover" offset="125">
                    <PopoverHeader>How To Use</PopoverHeader>
                    <PopoverBody style={{maxWidth: 300}}>
                        <p>
                            Create a trip!<br/>
                            - Toggle the trip manager on/off to start recording places via mouse clicks, or input coordinates / locations in the search bar and add place<br/><br/>
                            - Manage places with add or remove buttons <br/><br/>
                            - Manage trips with add or remove buttons <br/><br/>
                            - Filter results at the bottom
                        </p></PopoverBody></UncontrolledPopover></div>
        );
    }

    renderPlacesAndTrips(){
        return(
            <div>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[0])}
                {this.addASpace()}
                <Row style={{height: 30}}>
                    <Button style={{position: "absolute", left: 10}} color={this.toggleButtonColor()} size="sm" onClick={this.props.setTripRecord}>Record</Button>
                    <Button style={buttonList[0].style} size="sm" onClick={() => this.addATrip()}>{buttonList[0].label}</Button>
                    <Button style={buttonList[1].style} size="sm" onClick={() => {this.state.trips[this.state.stateIndex].resetPlaces(); this.forceUpdate()}}>{buttonList[1].label}</Button>
                </Row>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[1])}
                {this.addASpace()}
            </div>
        );
    }

    renderTripUI(){
        return(
            <div id="tripDiv" className={this.state.myClass}>
                <Row style={{height:5}}/>
                <div className="vertical-center justify-content-center" style={{position: "absolute",  top: 16, left: 262, height: 25, width: 25, borderRadius: "3px 3px 3px 3px", backgroundColor:"#C8C372", fontSize: 20, border: "1px ridge #1E4D2B", color: "#1E4D2B", cursor: "pointer"}}
                     onClick={() => this.divClicked()}>X</div>
                <Row className="justify-content-center">
                    <h4 style={{background: "linear-gradient(#1E4D2B, #002b0c)", padding: 4, left: 50,
                        border:"2px ridge #FFFFFF", borderRadius: "3px 3px 3px 3px", boxShadow: "1px 2px 1px 0 #000000", overflow:"hidden"}}>Trip Designer</h4>
                </Row>
                {this.renderPopover()}
                <div style={{position: "absolute", left: 10, top: 105, width: 320, height: 150, zIndex: 1100, overflow: "auto"}}>
                    {this.renderPlaceList(this.state.stateIndex)}
                </div>
                <Row style={{height:15}}/>
                <div style={{position: "relative", left: -17}}>
                    {this.addInputField(inputArray[0])}
                </div>
                {this.renderPlacesAndTrips()}
                <Row style={{top:5}}>
                    {this.addLoadSaveDistanceButtons(loadSaveDistance)}
                </Row>
            </div>
        );
    }

    renderPlaceList(index){
        let searchListArray = []
        for(let i = 0; i < this.state.trips[index].places.length; ++i){
            searchListArray.push(this.addPlaceListItem(i, index));
        }
        return(
            <div tabIndex="0">
                <ListGroup>
                    <div style={{position: "absolute", width: 300, height: 148, overflow:"auto"}}>
                        {searchListArray.map((element, index) => (<div key={index}>{element}</div>))} </div>
                </ListGroup>
            </div>
        );
    }

    toggleButtonColor(){
        if(this.props.recordingTrip === 1){ return "success" }
        else { return "danger" }
    }

    updateInputState(){
        if (event.target.name === "searchPlaces"){this.setState({searchPlaces: event.target.value});}
        else {this.setState({filter: event.target.value});}
    }

    resetTripPlaces(){
        this.state.trips[this.state.stateIndex].resetPlaces()
        this.forceUpdate();
    }

}
