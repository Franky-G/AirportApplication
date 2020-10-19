import React, {Component} from "react";
import {Row, InputGroup, PopoverHeader, PopoverBody, Popover, Button, ListGroupItem, ListGroup, ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem, InputGroupAddon} from "reactstrap";
import Input from "@material-ui/core/Input";
import {sendServerRequest} from "../../utils/restfulAPI";
import FileIO from "../Atlas/FileIO"
import TripObject from "../Trip/TripObject"
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
        this.state = {
            designerOpen: '', searchPlaces: "", filter: "",
            trips: [new TripObject("test", [[L.latLng(40,-105), 0, "ferrari"], [L.latLng(41,-105), 1, "Batman"]], "test note")],
            distance: 0, distanceArr: null, stateIndex: 0, openDropdown: false, openPopover: false, popupInput: "", } }

    render(){
        return(
            <div><FileIO {...this.state} ref={(ref) => this.FileIOREF=ref}/>{this.renderTripUI()}</div> );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.trips.length !== 0 && prevProps.atlasTripPlaces !== this.state.trips[this.state.stateIndex].places ){
            this.props.setTripPlaces(this.state.trips[this.state.stateIndex].places) }
    }

    addLoadSaveDistanceButtons(array){
        return(
            <div><Button size="sm" style={array[0].style} onClick={() => this.FileIOREF.openModal()}> {array[0].label}</Button>
                <Button size="sm" style={array[1].style} onClick={() => this.getFormatForSave()}> {array[1].label} </Button>
                <Button size="sm" style={array[2].style} onClick={() => {this.formatTripDistance()}}> {array[2].label} </Button>
                <p style={array[3].style}>Total Trip Distance: {this.state.distance} Mile(s)</p></div> ); }

    addATrip(){
        let tripsArray = this.state.trips.slice();
        tripsArray.push(new TripObject("New Trip", [], ""))
        this.setState({trips: tripsArray})
    }

    addASpace(){ return( <Row style={{height:5}}/>);}

    addInputField(array){
        return(
            <div><InputGroup>
                    <Input className="justify-content-center" name={array.name} style={{backgroundColor: "#FFFFFF", width: array.width, borderRadius: "3px 3px 3px 3px", border: "1px solid #FFFFFF", left: 27, height: 30, boxShadow: "1px 1px 1px 0 #000000", overflow: "hidden"}} onChange={() => this.updateInputState()}/>
                    <InputGroupAddon addonType="append" ><Button size="sm" style={{padding: 3, left: 27, boxShadow: "1px 1px 1px 0 #000000"}}>Search</Button></InputGroupAddon>
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
                <ListGroupItem id="searchListStyle" tag="button" title={this.state.trips[this.state.stateIndex].places[element][2]} action onClick={(e) => {e.stopPropagation(); this.onClickCall(element, tripIndex)}}>
                    {this.state.trips[tripIndex].name} {this.state.trips[tripIndex].places[element][1] + 1} | {this.state.trips[tripIndex].places[element][0].lat.toFixed(3)}{this.state.trips[tripIndex].places[element][0].lng.toFixed(3)}
                    {this.helperAddPlaceListItem(element, tripIndex)}</ListGroupItem></div> );
    }

    helperAddPlaceListItem(element, tripIndex) {
        let placeListItem = [{style: {position: "absolute", right: 5, top: 1, width: 19, height: 19, backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: 5, border: "1px solid #000000"},
            onClick: (e) => {e.stopPropagation(); this.state.trips[tripIndex].positionUp(element); this.forceUpdate()}, text: "^"},
            {style: {position: "absolute", right: 5, top: 22, width: 19, height: 19, backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: 5, border: "1px solid #000000"},
            onClick: (e) => {e.stopPropagation(); this.state.trips[tripIndex].positionDown(element); this.forceUpdate()}, text: "v"},
            {style: {position: "absolute", right: 30, top: 5, width: 30, height: 30, backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: 8, border: "1px solid #000000"},
            onClick: (e) => {e.stopPropagation(); this.state.trips[tripIndex].removePlace(element); this.forceUpdate()}, text: "X"}]
        return ( placeListItem.map(items => <div className="vertical-center justify-content-center" style={items.style} onClick={items.onClick}>{items.text}</div>) );
    }

    addTripListItem(index){
        return(
            <ListGroupItem id="searchListStyle" tag="button" title={this.state.trips[this.state.stateIndex].note} action onClick={(e) => {e.stopPropagation(); this.setState({stateIndex: index})}}>
                {this.state.trips[index].name}
                <div className="vertical-center justify-content-center" style={{position: "absolute", right: 5, top: 5, width: 30, height: 30, backgroundColor: "#1E4D2B", color: "#FFFFFF", borderRadius: 8, border: "1px solid #000000"}}
                     onClick={(e) => {e.stopPropagation(); this.spliceTrips(index); this.forceUpdate()}}>X</div></ListGroupItem> );
    }

    spliceTrips(index){
        let array = this.state.trips;
        array.splice(index, 1)
        if(this.state.stateIndex - 1 < 0) { this.setState({trips: array}) }
        else { this.setState({trips:array, stateIndex: this.state.stateIndex - 1}) }
    }

    closeTripUI() {
        if (this.state.designerOpen === '') { this.setState({designerOpen: 'designerIsOpen'}) }
        else {this.setState({designerOpen: '',}) }
    }

    toggleDropdown(){ this.setState({openDropdown: !this.state.openDropdown}) }

    addPlace(latLng, index){ this.state.trips[this.state.stateIndex].places.push([latLng, index, ("Latitude: " + latLng.lat.toFixed(4) + " | Longitude: " + latLng.lng.toFixed(4))]) }

    returnPlacesSize(){
        if(this.state.trips.length === 0){ return 0; }
        return this.state.trips[this.state.stateIndex].places.length
    }

    onClickCall(element, tripIndex){
        this.props.setWhereIsMarker(this.state.trips[tripIndex].places[element][0]);
        this.setState({index: tripIndex})
    }

    formatTripDistance() {
        let jsonStr = '{"places":[]}';let obj = JSON.parse(jsonStr);
        if (this.state.trips[this.state.stateIndex].places.length === 0) { this.setState({distance: 0}); return; }
        for(let i = 0; i < this.state.trips[this.state.stateIndex].places.length; i++) {
            let lat = this.state.trips[this.state.stateIndex].places[i][0].lat.toString();
            let long = this.state.trips[this.state.stateIndex].places[i][0].lng.toString();
            obj['places'].push({"name":this.state.trips[this.state.stateIndex].places[i][2],"latitude":lat,"longitude":long});
        }
        let distancePlaces = JSON.stringify(obj);
        distancePlaces = distancePlaces.slice(10,distancePlaces.length-1);
        distancePlaces = JSON.parse(distancePlaces)
        this.calculateTripDistance(distancePlaces);
        return(distancePlaces)
    }

    calculateTripDistance(latLngString){
        sendServerRequest({ requestType: "trip", requestVersion: 3,
            options: {title:"My Trip", earthRadius: "3959.0"}, places: latLngString
        }).then(distance => {
            let totalDistance = 0;
            let distances = distance.data.distances;
            for(let i = 0; i < distances.length; i++){ totalDistance += distances[i]; }
            this.setState({distance: totalDistance, distanceArr: distance.data.distances})
        });
    }

    getFormatForSave() {
        let tripSavePlaces = this.formatTripDistance()
        const fileContents = {
            requestType: "trip", requestVersion: 3,
            options: {title:this.state.trips[this.state.stateIndex].name, earthRadius: "3959.0"},
            places: tripSavePlaces
        }
        const fileString = JSON.stringify(fileContents);
        this.FileIOREF.downloadFile(fileString, this.state.trips[this.state.stateIndex].name+'.json', 'application/json')
    }

    renderDropdown(){
        return(
            <ButtonDropdown direction="up" isOpen={this.state.openDropdown} style={{position: "relative", left: 27, zIndex: 1100,}} size="sm" toggle={() => this.setState({openDropdown: !this.state.openDropdown})}>
                <DropdownToggle caret color="primary">Modify</DropdownToggle>
                <DropdownMenu style={{position: "absolute", top: -250, left: -5, width: 285, fontSize: 14}}>
                    <Input name="popupInput" placeholder="Enter format and select action" style={{margins: 2, position: "relative", left: 25, background: "linear-gradient(#cccccc, #FFFFFF)", color: "#000000", borderRadius: 5}}  onChange={() => this.updatePopupInput()}/>
                    {this.helpRenderDropdown()}
                </DropdownMenu></ButtonDropdown> );
    }

    helpRenderDropdown() {
        let dropDownItems = [{onClick: ()=> this.state.trips[this.state.stateIndex].reversePlaces(), text: "Reverse Trip"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].reversePlacesAt(Number(this.state.popupInput)), text: "Reverse Trip At: '3'"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].modifyStart(Number(this.state.popupInput)), text: "Set Start Location At: '2'"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].movePlace(this.state.popupInput), text: "Set Destination Position: '1, 2'"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].setPlaceNote(this.state.popupInput), text: "Destination Note: 'Bring camera, 3'"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].setNote(this.state.popupInput), text: "Make A Note For Trip: Hover for note"},
            {onClick: ()=> this.state.trips[this.state.stateIndex].setName(this.state.popupInput), text: "Name Trip: A meaningful name"}];
        return ( dropDownItems.map(items => <DropdownItem style={{position: "relative", left: -15}} onClick={items.onClick}>{items.text}</DropdownItem>) );
    }

    updatePopupInput(){ this.setState({popupInput: event.target.value}) }

    renderPopover(){
        return( <div className="d-flex">
                <Button id="Popover"
                        style={{position: "absolute", margin: 0, padding: 0, color: "#1E4D2B", backgroundColor: "#C8C372",
                            width: 30, height: 30, borderRadius: 30, left:10, top: 15, border: "2px ridge #1E4D2B", zIndex: 1001}}
                        onClick={(e) => {e.stopPropagation(); this.setState({openPopover: !this.state.openPopover})}}
                        onBlur={() => this.blurState()}>
                    ?
                </Button>
                <Popover isOpen={this.state.openPopover} placement="bottom" target="Popover" offset="125">
                    <PopoverHeader>How To Use</PopoverHeader>
                    <PopoverBody style={{maxWidth: 300}}><p>
                            Create a trip!<br/>
                            - Toggle the trip manager on/off to start recording places via mouse clicks, or input coordinates / locations in the search bar and add place<br/><br/>
                            - Re-sort or remove a place <br/>
                            - Modify the trip under 'Modify' button <br/>
                            Add input(s) separated by ',' at the top and select an action<br/>
                            - Add different trips</p>
                    </PopoverBody>
                </Popover></div>
        );
    }

    renderPlacesAndTrips(){
        return(
            <div style={{zIndex:1050}}>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[0])}
                {this.addASpace()}
                <Row style={{height: 30}}>
                    <Button style={{position: "absolute", left: 90}} color={this.toggleButtonColor()} size="sm" onClick={this.props.setTripRecord}>Record</Button>
                    <Button style={buttonList[0].style} size="sm" onClick={() => this.addATrip()}>{buttonList[0].label}</Button>
                    <Button style={buttonList[1].style} size="sm" onClick={() => {this.state.trips[this.state.stateIndex].resetPlaces(); this.forceUpdate()}}>{buttonList[1].label}</Button>
                    {this.renderDropdown()}</Row>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[1])}
                {this.addASpace()}
            </div>
        );
    }

    renderTripUI(){
        return(
            <div id="tripDiv" className={this.state.designerOpen}>
                <Row style={{height:5}}/>
                <div className="vertical-center justify-content-center" style={{position: "absolute",  top: 16, left: 262, height: 25, width: 25, borderRadius: "3px 3px 3px 3px", backgroundColor:"#C8C372", fontSize: 20, border: "1px ridge #1E4D2B", color: "#1E4D2B", cursor: "pointer"}}
                     onClick={() => this.closeTripUI()}>X</div>
                <Row className="justify-content-center">
                    <h4 style={{background: "linear-gradient(#1E4D2B, #002b0c)", padding: 4, left: 50,
                        border:"2px ridge #FFFFFF", borderRadius: "3px 3px 3px 3px", boxShadow: "1px 2px 1px 0 #000000", overflow:"hidden"}}>Trip Designer</h4>
                </Row>
                {this.renderPopover()}
                <div style={{position: "absolute", left: 10, top: 105, width: 320, height: 150, zIndex: 1100, overflow: "auto"}}>
                    {this.renderPlaceList(this.state.stateIndex, 0, listType)}
                </div>
                <Row style={{height:15}}/>
                <div style={{position: "relative", left: -17}}>
                    {this.addInputField(inputArray[0])}
                </div>
                {this.renderPlacesAndTrips()}
                {this.renderPlaceList(this.state.stateIndex, 1, listType)}
                <Row style={{top:5}}>
                    {this.addLoadSaveDistanceButtons(loadSaveDistance)}
                </Row>
            </div>
        );
    }

    renderPlaceList(index, tripOrPlace, styleArray){
        if(this.state.trips.length === 0) {return;}
        let searchListArray = []
        if(tripOrPlace === 0) { for (let i = 0; i < this.state.trips[index].places.length; ++i) { searchListArray.push(this.addPlaceListItem(i, index)); } }
        else { for (let i = 0; i < this.state.trips.length; ++i) { searchListArray.push(this.addTripListItem(i, index)); } }
        return(
            <div tabIndex="0"><ListGroup>
                    <div style={styleArray[tripOrPlace].style}>
                        {searchListArray.map((element, index) => (<div key={index}>{element}</div>))} </div>
                </ListGroup></div> );
    }

    toggleButtonColor(){
        if(this.props.recordingTrip === 1){ return "success" }
        else { return "danger" }
    }

    updateInputState(){ if (event.target.name === "searchPlaces"){this.setState({searchPlaces: event.target.value});} }

    resetTripPlaces(){
        this.state.trips[this.state.stateIndex].resetPlaces()
        this.forceUpdate();
    }

    blurState(){
        if(this.state.openPopover === false){ return; }
        else { this.setState({openPopover: !this.state.openPopover}) }
    }
}
