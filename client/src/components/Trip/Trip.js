import React, {Component} from "react";
import {
    Row,
    InputGroup,
    InputGroupAddon,
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover,
    Button, ListGroupItem, Container, ListGroup,
} from "reactstrap";
import Input from "@material-ui/core/Input";

const searchListStyle = {margin: 0, padding: 8, height: "100%", width: 279, color: "#FFFFFF", zIndex: 1009, fontSize: 13, borderRadius: "3px 3px 3px 3px", border: "2px solid #1E4D2B", background: "#002b0c"}
const labelStyle = {opacity: 0.2, overflow:"hidden"}
const inputArray = [{width: 211, label: "Add Place", width2: 70, name: "searchPlaces"}, {width: 229, label: "Filter", width2: 50, name: "filter"}]
const placesAndTrips = [{height: 150, text: "Places"}, {height: 90, text: "Trips"}]

export default class SearchModule extends Component {

    constructor(props) {
        super(props);

        this.divclicked = this.divclicked.bind(this);
        this.resetTripPlaces = this.resetTripPlaces.bind(this);
        this.removeATrip = this.removeATrip.bind(this);
        this.state = {
            myclass: '',
            searchPlaces: "",
            filter: "",
            trips: [[L.latLng(40,-105), L.latLng(40,-105) ], [L.latLng(30,-105), L.latLng(35,-105) ]],
            tripPlaces: [],
            index: 0,

        }
    }

    render(){
        return(
            <div>
                {this.renderTripUI()}
            </div>
        );
    }

    addATrip(){
        let tripsArray = []
    }

    addToTrips(){
        let tripsArray = this.state.trips;
        for(let i = 0; i < this.state.tripPlaces; ++i){
            tripsArray[this.state.index].push(this.state.tripPlaces[i]);
        }
        this.setState({trips: tripsArray})
        console.log(this.state.trips)
    }

    addListGroupItem(index){
        return (
            <ListGroupItem style={searchListStyle} tag="button" action
                           onClick={() => this.props.setWhereIsMarker(L.latLng(this.state.tripPlaces[index].lat, this.state.tripPlaces[index].lng))}>
                {index}
                <div className="justify-content-center vertical-center" style={{borderRadius: 5, border: "1px solid #FFFFFF", padding: 2, margin: 0, width: 25, height: 25, position: "absolute",top: 5, right: 3, backgroundColor: "#1E4D2B", color: "#FFFFFF"}} onClick={this.removeAPlace}>X</div>
            </ListGroupItem>
        );
    }

    addListTripItem(index){
        return (
            <ListGroupItem style={searchListStyle} tag="button" action
                           onClick={() => this.setState({tripPlaces: this.state.trips[index], index: index})}>
                {index}
                <Button style={{position: "absolute", top: 3, right: 3, backgroundColor: "#1E4D2B", color: "#FFFFFF"}} size="sm" onClick={this.removeATrip}> X </Button>
            </ListGroupItem>
        );
    }

    addInputField(array){
        return(
            <div>
                <InputGroup>
                    <Input className="justify-content-center" name={array.name} style={{backgroundColor: "#FFFFFF", width: array.width, borderRadius: "3px 0 0 3px", border: "1px solid #FFFFFF", left: 27, height: 30, boxShadow: "1px 1px 1px 0 #000000", overflow: "hidden"}} onChange={() => this.updateInputState()}/>
                    <InputGroupAddon addonType="append"><Button style={{ background: "linear-gradient(#1E4D2B, #002b0c)", padding: 2, color: "#FFFFFF", borderRadius: "0 3px 3px 0", border: "1px solid #FFFFFF", left: 27, fontSize: 11, width: array.width2, boxShadow: "1px 1px 1px 0 #000000", overflow:"hidden"}} title="Add location">{array.label}</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }

    addPlaceOrDistance(array){
        return(
            <div>
                <Row id="placePanel" className="justify-content-center">
                    <div className="tripBackdrop" style={{width:280, height: array.height, fontSize: 40}} ><label style={labelStyle} className="vertical-center justify-content-center" >{array.text}</label></div>
                </Row>
            </div>
        );
    }

    addASpace(){
        return(
            <Row style={{height:5}}/>
        );
    }

    divclicked() {
        if (this.state.myclass === '') {
            this.setState({
                myclass: 'coolclass'
            })
        } else {
            this.setState({
                myclass: '',
            })
        }
    }

    updateInputState(){
        if (event.target.name === "searchPlaces"){this.setState({searchPlaces: event.target.value});}
        else {this.setState({filter: event.target.value});}
    }

    renderPopover(){
        return(
            <div className="d-flex">
                <Button id="UncontrolledPopover"
                        style={{position: "absolute", margin: 0, padding: 0, color: "#1E4D2B", backgroundColor: "#C8C372",
                            width: 30, height: 30, borderRadius: 30, left:10, top: 13, border: "2px ridge #1E4D2B", zIndex: 1001}}>
                    ?
                </Button>
                <UncontrolledPopover trigger="focus" placement="bottom" target="UncontrolledPopover" offset="125">
                    <PopoverHeader>How To Use</PopoverHeader>
                    <PopoverBody style={{maxWidth: 300}}>
                        <p>
                            Create a trip!<br/>
                            - Toggle the trip manager on/off from the dropdown button to start recording places via mouse clicks, or input coordinates / locations in the search bar and add place<br/><br/>
                            - Manage places with add or remove buttons <br/><br/>
                            - Manage trips with add or remove buttons <br/><br/>
                            - Filter results at the bottom
                        </p>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }

    renderPlacesAndTrips(){
        return(
            <div>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[0])}
                {this.addASpace()}
                <Row style={{height: 30}}>
                    <Button style={{position: "absolute", right: 10}} size="sm" onClick={this.addATrip}>Add Trip</Button>
                </Row>
                {this.addASpace()}
                {this.addPlaceOrDistance(placesAndTrips[1])}
                {this.addASpace()}
            </div>
        );
    }

    renderTripUI(){
        return(
            <div id="tripDiv" className={this.state.myclass} >
                <Row style={{height:5}}/>
                <div className="vertical-center justify-content-center" style={{position: "absolute",  top: 16, left: 262, height: 25, width: 25, borderRadius: "3px 3px 3px 3px", backgroundColor:"#C8C372", fontSize: 20, border: "1px ridge #1E4D2B", color: "#1E4D2B", cursor: "pointer"}}
                     onClick={() => this.divclicked()}>X</div>
                <Row className="justify-content-center">
                    <h4 style={{background: "linear-gradient(#1E4D2B, #002b0c)", padding: 4, left: 50,
                        border:"2px ridge #FFFFFF", borderRadius: "3px 3px 3px 3px", boxShadow: "1px 2px 1px 0 #000000", overflow:"hidden"}}>Trip Designer</h4>
                </Row>
                {this.renderPopover()}
                <div style={{position: "absolute", left: -4, top: 105, width: 320, height: 150, zIndex: 1100, overflow: "auto"}}>
                    {this.renderSearchList()}
                </div>
                <Row style={{height:15}}/>
                {this.renderTripList()}
                <div style={{position: "relative", left: -17}}>
                    {this.addInputField(inputArray[0])}
                </div>
                {this.renderPlacesAndTrips()}
                <Row style={{top:5}}>
                    {this.addInputField(inputArray[1])}
                </Row>
            </div>
        );
    }

    renderSearchList(){
        let searchListArray = []
        for(let i = 0; i < this.state.tripPlaces.length; ++i){
            searchListArray.push(this.addListGroupItem(i));
        }
        return(
            <div tabIndex="0">
                <Container>
                    <ListGroup>
                        <div style={{position: "absolute", width: 300, height: 148, overflow:"auto"}}>
                            {searchListArray.map((element, index) => (<div key={index}>{element}</div>))} </div>
                    </ListGroup>
                </Container>
            </div>
        );
    }

    renderTripList(){
        let searchListArray = []
        for(let i = 0; i < this.state.trips.length; ++i){
            searchListArray.push(this.addListTripItem(i));
        }
        return(
            <div tabIndex="1">
                <Container>
                    <ListGroup>
                        <div style={{position: "absolute", width: 300, height: 90, top: 293, left: 10, zIndex: 1100}}>
                            {searchListArray.map((element, index) => (<div key={index}>{element}</div>))}
                        </div>
                    </ListGroup>
                </Container>
            </div>
        );
    }

    removeAPlace(index){
        let thisArray = this.state.tripPlaces;
        thisArray = thisArray.slice(0, index)
        this.setState({tripPlaces: thisArray})
    }

    removeATrip(index){
        console.log("removeTrip")
        let tripsArray = this.state.trips.slice();
        tripsArray = tripsArray.slice(index, 1)
        this.setState({trips:tripsArray})
    }

    resetTripPlaces(){
        let tripsArray = this.state.trips;
        tripsArray[this.state.index] = [];
        console.log(tripsArray)
        this.setState({tripPlaces: [], trips: tripsArray})
    }

    setTripPlaces(mapClickInfo){
        this.state.tripPlaces.push(mapClickInfo.latlng);
        console.log(this.state.tripPlaces)
    }
}