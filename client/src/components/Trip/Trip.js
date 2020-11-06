import React, {Component} from "react";
import {Row, InputGroup, PopoverHeader, PopoverBody, Popover, Button, ListGroupItem, ListGroup, ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem, InputGroupAddon, Container} from "reactstrap";
import Input from "@material-ui/core/Input";
import {sendServerRequest} from "../../utils/restfulAPI";
import FileIO from "../Atlas/FileIO"
import TripObject from "../Trip/TripObject"
import {SListArrayHelper, modifyText, addPOrDHelper} from "../Cheese"
const labelStyle = {opacity: 0.2, overflow:"hidden"}
const inputArray = [{width: 228, label: "Add Place", width2: 70, name: "searchPlaces"}, {width: 229, label: "Filter", width2: 50, name: "filter"}]
const placesAndTrips = [{height: 150, text: "Places"}, {height: 90, text: "Trips"}]
const buttonList = [{style: {position: "absolute", right: 10}, label: "Add Trip"}, {style: {position: "absolute", left: 159}, label: "Reset"}]
const loadSaveDistance = [{style: {position: "absolute", padding: 4, left: 10}, label: "Load"}, {style: {position: "absolute", padding: 4, left: 58}, label: "Save"}, {style: {position: "absolute", padding: 4, left: 108}, label: "Distance"}, {style: {position: "relative", padding: 4, left: 20, top: 30}}]
const listType = [{style: {position: "absolute", width: 300, height: 148, overflow:"auto", zIndex: 1015}}, {style:{position: "absolute", width: 300, height: 90, left: 10, bottom: 65, color: "#FFFFFF", overflow:"auto", zIndex: 1015}}]

export default class SearchModule extends Component {
    constructor(props) {
        super(props);
        this.closeTripUI = this.closeTripUI.bind(this); this.addATrip = this.addATrip.bind(this);
        this.onClickCall = this.onClickCall.bind(this);
        this.loadPlaces = this.loadPlaces.bind(this);
        this.state = {
            designerOpen: '', searchPlaces: "", filter: "",
            trips: [new TripObject("My Trip", [], "My Favorite Places")],
            distance: 0, distanceArr: null, stateIndex: 0, openDropdown: false, openPopover: false, popupInput: "", searchCoords: "",
            searchListOpen: false, searchListArray: [], numberFound: 0, earthRadius: "3959.0"} }

    render(){
        return(
            <div><FileIO {...this.state} ref={(ref) => this.FileIOREF=ref} loadPlaces={this.loadPlaces}/>
                {this.renderTripUI()}
                {this.state.searchListOpen && this.renderSearchList()} </div> ); }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.trips.length !== 0 && prevProps.atlasTripPlaces !== this.state.trips[this.state.stateIndex].places ){ this.props.setTripPlaces(this.state.trips[this.state.stateIndex].places) } }

    addLoadSaveDistanceButtons(array){
        return(
            <div><Button size="sm" style={array[0].style} onClick={() => this.FileIOREF.openModal()}> {array[0].label}</Button>
                <Button size="sm" style={array[1].style} onClick={() => this.getFormatForSave()}> {array[1].label} </Button>
                <Button size="sm" style={array[2].style} onClick={() => {this.formatTripDistance()}}> {array[2].label} </Button>
                <p style={array[3].style}>Total Trip Distance: {this.state.distance} Mile(s)</p></div> ); }

    addATrip(){
        let tripsArray = this.state.trips.slice();
        tripsArray.push(new TripObject("New Trip", [], ""))
        this.setState({trips: tripsArray}) }

    addASpace(){ return( <Row style={{height:5}}/>);}

    addInputField(array){
        return(
            <div><InputGroup>
                <Input className="justify-content-center" name={array.name} placeholder={"Enter Lat, Lng or Airport Name"} style={{backgroundColor: "#ffffff", width: array.width, borderRadius: "3px 3px 3px 3px", border: "1px solid #FFFFFF", left: 27, height: 30, boxShadow: "1px 1px 1px 0 #000000", overflow: "hidden"}} onChange={() => this.updateInputState()}/>
                <InputGroupAddon addonType="append" ><Button size="sm" style={{padding: 3, left: 27, boxShadow: "1px 1px 1px 0 #000000"}} onClick={() => this.validateCoords()}>Search</Button></InputGroupAddon></InputGroup></div> ); }

    validateCoords() {
        if (this.state.searchPlaces) { try {
            let coordParse = require('coordinate-parser')
            let coordStr = this.state.searchPlaces
            let coordLocation = new coordParse(this.state.searchPlaces);
            let coordLat = coordLocation.getLatitude();
            let coordLng = coordLocation.getLongitude();
            this.addCoordPlace(coordLat, coordLng, coordStr)
        } catch (error) {this.sendFindServerRequest()}}
        else{alert("Trip Search Box Is Empty!")}
    }

    addCoordPlace(lat, lng, coordStr){
        let coords = L.latLng(lat, lng);
        let index = this.state.trips[this.state.stateIndex].places.length;
        let slice = this.state.trips.slice();
        slice[this.state.stateIndex].places.push([coords, index, coordStr, coordStr]);
        this.setState({trips: slice});
        this.onClickCall(index ,this.state.stateIndex); }

    addPlaceOrDistance(array){ return( addPOrDHelper(array, labelStyle)); }

    addPlaceListItem(element, tripIndex){
        let tripNote = this.state.trips[this.state.stateIndex].places[element][0].lat.toFixed(3) + ", " + this.state.trips[this.state.stateIndex].places[element][0].lng.toFixed(3)
        return(
            <div>
                <ListGroupItem id="searchListStyle" className="vertical-center" tag="button" title={tripNote} action onClick={(e) => {e.stopPropagation(); this.onClickCall(element, tripIndex)}}>
                    {this.state.trips[tripIndex].places[element][1] + 1} | {this.state.trips[tripIndex].places[element][2]}{this.helperAddPlaceListItem(element, tripIndex)}</ListGroupItem></div> );}

    helperAddPlaceListItem(element, tripIndex) {
        const helpPlaceListItem = (e, tripIndex, methodName, params) => { e.stopPropagation(); this.state.trips[tripIndex][methodName](params); this.forceUpdate(); }
        let placeListItem = [{borderRadius: 5, text: "^", right: 5, height: 19, top: 1, width:19, onclick: (e) => helpPlaceListItem(e, tripIndex, "positionUp", element)},
            {right: 5, top: 22, width: 19, height: 19, borderRadius: 5, text: "v", onclick: (e) => helpPlaceListItem(e, tripIndex, "positionDown", element)},
            {height: 30, onclick: (e) => helpPlaceListItem(e, tripIndex, "removePlace", element), right: 30, text: "X", top: 5, width: 30, borderRadius: 8}]
        return ( placeListItem.map(items => <div className="vertical-center justify-content-center" style={{position: "absolute", right: items.right, top: items.top, width: items.width, height: items.height,
            backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: items.borderRadius, border: "1px solid #000000"}} onClick={items.onclick}>{items.text}</div>) );}

    addTripListItem(index){
        return(
            <ListGroupItem id="searchListStyle" tag="button" title={this.state.trips[this.state.stateIndex].note} action onClick={(e) => {e.stopPropagation(); this.setState({stateIndex: index})}}>
                {this.state.trips[index].name}
                <div className="vertical-center justify-content-center" style={{position: "absolute", right: 5, top: 5, width: 30, height: 30, backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: 8, border: "1px solid #000000"}}
                     onClick={(e) => {e.stopPropagation(); this.spliceTrips(index); this.forceUpdate()}}>X</div></ListGroupItem> ); }

    loadPlaces(places, name, radius){
        this.setState({earthRadius: radius})
        let array = this.state.trips.slice();
        let placesArray = []
        for(let i = 0; i < places.length; ++i){ placesArray.push([L.latLng(places[i].latitude,places[i].longitude), i, places[i].name]) }
        array.push(new TripObject(name, placesArray, radius))
        this.setState({trips: array}) }

    spliceTrips(index){
        let array = this.state.trips;
        array.splice(index, 1)
        if(this.state.stateIndex - 1 < 0) { this.setState({trips: array}) }
        else { this.setState({trips:array, stateIndex: this.state.stateIndex - 1}) } }

    closeTripUI() {
        if (this.state.designerOpen === '') { this.setState({designerOpen: 'designerIsOpen'}) }
        else {this.setState({designerOpen: '',}) } }

    addPlace(latLng, index, note){ this.state.trips[this.state.stateIndex].places.push([latLng, index, note]) }

    returnPlacesSize(){
        if(this.state.trips.length === 0){ return 0; }
        return this.state.trips[this.state.stateIndex].places.length }

    onClickCall(element, tripIndex){
        this.props.setWhereIsMarker(this.state.trips[tripIndex].places[element][0]);
        this.setState({index: tripIndex}) }

    formatTripDistance() {
        let jsonStr = '{"places":[]}';let obj = JSON.parse(jsonStr);
        if (this.state.trips[this.state.stateIndex].places.length === 0) { this.setState({distance: 0}); return; }
        for(let i = 0; i < this.state.trips[this.state.stateIndex].places.length; i++) {
            let indx = this.state.stateIndex
            let lat = this.state.trips[indx].places[i][0].lat;
            lat = lat.toString()
            let long = this.state.trips[this.state.stateIndex].places[i][0].lng.toString();
            obj['places'].push({"name":this.state.trips[this.state.stateIndex].places[i][2],"latitude":lat,"longitude":long, "coordinates": this.state.trips[this.state.stateIndex].places[i][3]});
        }
        let distancePlaces = JSON.stringify(obj);
        distancePlaces = distancePlaces.slice(10,distancePlaces.length-1);
        distancePlaces = JSON.parse(distancePlaces)
        this.calculateTripDistance(distancePlaces);
        return(distancePlaces) }

    calculateTripDistance(latLngString){
        sendServerRequest({ requestVersion: 3, requestType: "trip", places: latLngString,
            options: {earthRadius: this.state.earthRadius, title: this.state.trips[this.state.stateIndex].name}}).then(distance => {
            let totalDistance = 0;
            let distances = distance.data.distances;
            for(let i = 0; i < distances.length; i++){ totalDistance += distances[i]; }
            this.setState({distance: totalDistance, distanceArr: distance.data.distances})
        }); }

    getFormatForSave() {
        let tripSavePlaces = this.formatTripDistance()
        const fileContents = {requestType: "trip", requestVersion: 3, options: {title:this.state.trips[this.state.stateIndex].name, earthRadius: this.state.earthRadius}, places: tripSavePlaces, distances: this.state.distanceArr}
        const fileString = JSON.stringify(fileContents);
        this.FileIOREF.downloadFile(fileString, this.state.trips[this.state.stateIndex].name+'.json', 'application/json')}

    renderDropdown(){
        return(
            <ButtonDropdown direction="up" isOpen={this.state.openDropdown} style={{position: "relative", left: 27, zIndex: 1100,}} size="sm" toggle={() => this.setState({openDropdown: !this.state.openDropdown})}>
                <DropdownToggle caret color="primary">Modify</DropdownToggle>
                <DropdownMenu style={{position: "absolute", top: -255, left: -5, width: 285, fontSize: 14}}>
                    <Input name="popupInput" placeholder="Enter format and select action" style={{margins: 2, position: "relative", left: 25, background: "linear-gradient(#cccccc, #FFFFFF)", color: "#000000", borderRadius: 5}}  onChange={() => this.updatePopupInput()}/>
                    {this.helpRenderDropdown()}</DropdownMenu></ButtonDropdown> ); }

    helpRenderDropdown() {
        const dropDownAction = (methodName, params) => { this.state.trips[this.state.stateIndex][methodName](params); }
        let dropDownItems = [{onClick: ()=> this.state.trips[this.state.stateIndex].reversePlaces(), text: "Reverse Trip"},
            {onClick: ()=> {this.inputCheck() && dropDownAction("reversePlacesAt", Number(this.state.popupInput))}, text: "Reverse Trip At: '3'"},
            {text: "Set Start Location At: '2'", onClick: ()=> {this.inputCheck() && dropDownAction("modifyStart", Number(this.state.popupInput))}},
            {onClick: ()=> {this.inputCheck() && dropDownAction("movePlace", this.state.popupInput)}, text: "Set Destination Position: '1, 2'"},
            {onClick: ()=> {this.inputCheck() && dropDownAction("setPlaceNote", this.state.popupInput)}, text: "Destination Note: 'Bring camera, 3'"},
            {onClick: ()=> {this.inputCheck() && dropDownAction("setNote", this.state.popupInput)}, text: "Make A Note For Trip: Hover for note"},
            {onClick: ()=> {this.inputCheck() && dropDownAction("setName", this.state.popupInput)}, text: "Name Trip: A meaningful name"}];
        return ( dropDownItems.map(items => <DropdownItem style={{position: "relative", left: -15}} onClick={items.onClick}>{items.text}</DropdownItem>) );}

    updatePopupInput(){ this.setState({popupInput: event.target.value}) }

    inputCheck(){return !(this.state.popupInput === "" || Number(this.state.popupInput) < 0);}

    renderPopover(){
        return( <div className="d-flex">
                <Button id="Popover" style={{position: "absolute", margin: 0, padding: 0, color: "#1E4D2B", backgroundColor: "#C8C372", width: 30, height: 30, borderRadius: 30, left:10, top: 15, border: "2px ridge #1E4D2B", zIndex: 1001}}
                        onClick={(e) => {e.stopPropagation(); this.setState({openPopover: !this.state.openPopover})}}
                        onBlur={() => this.blurState()}> ? </Button>
                <Popover isOpen={this.state.openPopover} placement="bottom" target="Popover" offset="125">
                    <PopoverHeader>How To Use</PopoverHeader>
                    <PopoverBody style={{maxWidth: 300}}>{modifyText()}</PopoverBody></Popover></div> ); }

    renderPlacesAndTrips(){
        return(
            <div style={{zIndex:1050}}>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[0])}
                {this.addASpace()}
                <Row style={{height: 30}}>
                    <Button style={{position: "absolute", left: 90}} color={this.toggleButtonColor()} size="sm" onClick={this.props.setTripRecord}>Record</Button>
                    <Button style={buttonList[0].style} size="sm" onClick={() => this.addATrip()}>{buttonList[0].label}</Button>
                    <Button style={buttonList[1].style} size="sm" onClick={() => {this.state.trips[this.state.stateIndex].resetPlaces(); this.state.earthRadius = "3959.0"; this.state.distance = 0; this.forceUpdate()}}>{buttonList[1].label}</Button>
                    {this.renderDropdown()}</Row>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[1])}
                {this.addASpace()}</div> ); }

    renderTripUI(){
        return(
            <div id="tripDiv" className={this.state.designerOpen}>
                <Row style={{height:5}}/>
                <div className="vertical-center justify-content-center" style={{position: "absolute",  top: 16, left: 262, height: 25, width: 25, borderRadius: "3px 3px 3px 3px", backgroundColor:"#C8C372", fontSize: 20, border: "1px ridge #1E4D2B", color: "#1E4D2B", cursor: "pointer"}}
                     onClick={() => {this.closeTripUI(); this.setState({searchListOpen: false})}}>X</div>
                <Row className="justify-content-center">
                    <h4 style={{background: "linear-gradient(#1E4D2B, #002b0c)", padding: 4, left: 50, border:"2px ridge #FFFFFF", borderRadius: "3px 3px 3px 3px", boxShadow: "1px 2px 1px 0 #000000", overflow:"hidden"}}>Trip Designer</h4></Row>
                {this.renderPopover()}
                <div style={{position: "absolute", left: 10, top: 105, width: 320, height: 150, zIndex: 1100, overflow: "auto"}}>{this.renderPlaceList(this.state.stateIndex, 0, listType)}</div>
                <Row style={{height:15}}/><div style={{position: "relative", left: -17}}>{this.addInputField(inputArray[0])}</div>
                {this.renderPlacesAndTrips()}
                {this.renderPlaceList(this.state.stateIndex, 1, listType)}
                <Row style={{top:5}}>{this.addLoadSaveDistanceButtons(loadSaveDistance)}</Row></div> ); }

    placeLoop(arr, ind){for (let i = 0; i < this.state.trips[ind].places.length; ++i) {arr.push(this.addPlaceListItem(i, ind));}}

    tripLoop(arr, ind) {for (let i = 0; i < this.state.trips.length; ++i) {arr.push(this.addTripListItem(i, ind));}}

    getSearchListArray(ind, TorP){
        let searchListArr = [];
        if (TorP === 0){this.placeLoop(searchListArr, ind)}
        else{this.tripLoop(searchListArr, ind)}
        return searchListArr; }

    renderPlaceList(index, tripOrPlace, styleArray){
        if(this.state.trips.length === 0) { return; }
        let searchListArray = this.getSearchListArray(index, tripOrPlace);
        return(<div tabIndex="0"><ListGroup><div style={styleArray[tripOrPlace].style}>{SListArrayHelper(searchListArray)} </div></ListGroup></div>);}

    toggleButtonColor(){if(this.props.recordingTrip === 1){ return "success" } else { return "danger" } }

    updateInputState(){ if (event.target.name === "searchPlaces"){this.setState({searchPlaces: event.target.value});} }

    resetTripPlaces(){ this.state.trips[this.state.stateIndex].resetPlaces(); this.forceUpdate(); }

    blurState(){
        if(this.state.openPopover === false){}
        else { this.setState({openPopover: !this.state.openPopover}) } }

    async sendFindServerRequest() {
        await sendServerRequest({requestType: "find", requestVersion: 2, match: this.state.searchPlaces, limit: 20, narrow: {}})
            .then(places => {
                if (places) { try {
                        let outerArray = [];
                        for (let i = 0; i < 20; ++i) {
                            let elementArray = []
                            if (places.data.places[i] !== undefined) {
                                elementArray.push(places.data.places[i].name);
                                elementArray.push(places.data.places[i].latitude);
                                elementArray.push(places.data.places[i].longitude);
                            } outerArray.push(elementArray); }
                        this.setState({searchListArray: outerArray, searchListOpen: true, numberFound: places.data.found});
                    } catch (error) { console.error(error) }
                } }); }

    addSearchItem(index){
        let tripsArray = this.state.trips
        tripsArray[this.state.stateIndex].places.push([L.latLng(this.state.searchListArray[index][1], this.state.searchListArray[index][2]), this.state.trips[this.state.stateIndex].places.length, this.state.searchListArray[index][0]])
        this.setState({trips: tripsArray})}

    renderSearchList(){
        let SLArray = []
        for(let i = 0; i < this.state.numberFound; ++i){
            if(i >= 20){break;}
            SLArray.push(<ListGroupItem id="searchListStyle" style={{maxWidth: 268, height: 55}} tag="button" action onClick={() => {this.addSearchItem(i); this.setState({searchListOpen: false})}}>{this.state.searchListArray[i][0]}</ListGroupItem>);
        }
        return(
            <div tabIndex="0">
                <Container style={{padding: 0, margin: 0, position: "fixed", top: 252, left: 67, width: 290, backgroundColor: "#C8C372",
                    maxHeight: 230, overflow: "auto", borderRadius: 5, border: "2px solid #C8C372", zIndex: 1050}}>
                    <ListGroup style={{padding:0}} onBlur={() => this.setState({searchListOpen: false})}>
                        <div onClick={() => this.setState({searchListOpen: false})}>
                            {SListArrayHelper(SLArray)} </div></ListGroup></Container></div> ); }
}