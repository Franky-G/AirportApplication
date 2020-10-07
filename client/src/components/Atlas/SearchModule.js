import {Button, Col, Input, Row, Container, ListGroup, ListGroupItem} from "reactstrap";
import React, {Component} from "react";
import searchButtonIcon from "../../static/images/magIcon.png";
import Zoom from "@material-ui/core/Zoom";
import {sendServerRequest} from "../../utils/restfulAPI";
import RadioButtons from "./RadioButtons";
import WhereIs from "./WhereIs";

let place1, place2, matchPattern, limitInt;

export default class SearchModule extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.switchToWhereIsModule = this.switchToWhereIsModule.bind(this);
        this.switchToDistanceModule = this.switchToDistanceModule.bind(this);
        this.switchToLocationModule = this.switchToLocationModule.bind(this);
        this.searchBarCoordsIntermediate = this.searchBarCoordsIntermediate.bind(this);
        this.state = {
            showDistanceSearch: false, showLocationSearch: false, showWhereIsSearch: false, coreModule: false, searchIsOn: false, searchTextFrom: "", searchTextTo: "",
            searchBarText: "", searchWhereIsTextTo: "", searchWhereIsTextFrom: "", distance: null, numberFound: 0, searchArray: [],
        }
    }

    render() {
        return (
            <div>
                <RadioButtons {...this.state}
                              switchToDistanceModule={this.switchToDistanceModule}
                              switchToLocationModule={this.switchToLocationModule}
                              switchToWhereIsModule={this.switchToWhereIsModule}/>
                <WhereIs {...this.state}
                         searchBarCoordsIntermediate={this.searchBarCoordsIntermediate}/>
                {this.addSearchButton()}
                {this.state.coreModule && this.renderSearchModule()}
            </div>
        );
    }


    addListGroupItem(index){
        return (
            <ListGroupItem className="searchListStyle" tag="button" action
                           onClick={() => this.props.setSearchBarCoords(this.state.searchArray[index][1]+","+this.state.searchArray[index][2])}>{this.state.searchArray[index][0]})</ListGroupItem>
        );
    }

    addSearchButton() {
        return (
            <div>
                <button className="home-btn" style={{top: 100, left: 25, zIndex: 1013}}
                        onClick={() => this.toggleShowSearchModule()}>
                    <span><img src={searchButtonIcon} style={{width: 16, height: "auto"}} title="Search" alt="search"/></span>
                </button>
            </div>
        );
    }

    calcDist() {
        if (this.state.searchTextFrom && this.state.searchTextTo) {
            this.helperValidFromTo(0)
        }
        if (this.state.searchTextFrom && !this.state.searchTextTo) {
            this.helperValidFromTo(1)
        }
        if (!this.state.searchTextFrom && this.state.searchTextTo) {
            this.helperValidFromTo(2)
        }
        if (!this.state.searchTextFrom && !this.state.searchTextTo) {
            let place1 = this.props.prevLocation[0];
            let place2 = this.props.prevLocation[1];
            if(this.props.prevLocation[1] !== null)
                this.sendDistanceServerRequest(place1.lat.toString(), place1.lng.toString(), place2.lat.toString(), place2.lng.toString());
        }
    }


    helperValidFromTo(index) {
        place1 = this.state.searchTextFrom.split(',')
        place2 = this.state.searchTextTo.split(',')
        if (index === 0) { this.sendDistanceServerRequest(place1[0], place1[1], place2[0], place2[1]) }
        if (index === 1) {
            place2 = this.props.prevLocation[0]
            this.sendDistanceServerRequest(place1[0], place1[1], place2.lat.toString(), place2.lng.toString())
        }
        if (index === 2) {
            place1 = this.props.prevLocation[0]
            this.sendDistanceServerRequest(place1.lat.toString(), place1.lng.toString(), place2[0], place2[1])
        }
    }

    handleInputChange(){
        const target = event.target;
        if (target.name === "searchBarTo") {this.setState({searchTextTo: target.value});}
        if (target.name === "searchBarFrom") {this.setState({searchTextFrom: target.value});}
        if (target.name === "searchBar") {this.setState({searchBarText: target.value});}
    }

    renderDistanceModule() {
        return (
            <div >
                <Row xs={2}>
                    <Col><Input name={"searchBarFrom"} style={{margin: 5, width: "100%"}} placeholder="From: (Lat,Lng)" onChange={() => this.handleInputChange()}/></Col>
                    <Col style={{left: -20}}><Input name={"searchBarTo"} style={{margin: 5, width: 160}} placeholder="To: (Lat,Lng)" onChange={() => this.handleInputChange()}/></Col>
                </Row>
                <Col style={{left: 265, top: 55}}>{<Button className="p-1 distanceButtonStyle" onClick={() => {this.calcDist()}}> Calculate </Button>}</Col>
                <p className="searchTypeStyle">
                    Use Search Bars Or Click On Map<br/>
                    Distance = {this.state.distance} miles
                </p>
            </div>
        );
    }

    renderLocationModule() {
        return (
            <div>
                <Row>
                    <Col><Input name={"searchBar"} style={{margin: 5, width: "97%"}} placeholder="Enter name of place" onChange={() => this.handleInputChange()}/></Col>
                </Row>
                <Col style={{position: "absolute", left: 277, top: 103}}>
                    <Button className="p-1 distanceButtonStyle" onClick = {() => {this.returnPlaces()}}> Search </Button>
                </Col>
                <p className="searchTypeStyle">
                    Location = {this.state.searchBarText}<br/>
                    Found = {this.state.numberFound}
                </p>
            </div>
        );
    }

    searchBarCoordsIntermediate(coords){
        this.props.setSearchBarCoords(coords);
    }

    renderSearchList(){
        let searchListArray = []
        for(let i = 0; i < this.state.numberFound; ++i){
            if(i >= 5){break;}
            searchListArray.push(this.addListGroupItem(i));
        }
        return(
            <Container style={{position: "absolute", bottom:148, left:40, width: "90%"}}>
                <ListGroup onClick={() => this.setState({searchIsOn: false})}>
                    {searchListArray.map((element, index) => (<div key={index}>{element}</div>))}
                </ListGroup>
            </Container>
        );
    }

    renderSearchModule() {
        return (
            <Zoom in={true} timeout={350}>
                <div className="searchModuleStyle">
                    {this.state.showDistanceSearch && this.renderDistanceModule()}
                    {this.state.showLocationSearch && this.renderLocationModule()}
                    {this.state.searchIsOn && this.renderSearchList()}
                </div>
            </Zoom>
        );
    }

    returnPlaces(){
        matchPattern = this.state.searchBarText;
        limitInt = 5;
        this.sendFindServerRequest(matchPattern, limitInt);
    }

    sendDistanceServerRequest(lat1, long1, lat2, long2) {
        let markerArray = [L.latLng(lat1, long1), L.latLng(lat2, long2)];
        if(this.state.searchTextFrom !== ""){
            this.props.setSearchTextIsEmpty(false);
        }
        sendServerRequest({requestType: "distance", requestVersion: 2, earthRadius: 3959,
            place1: {latitude: lat1, longitude: long1},
            place2: {latitude: lat2, longitude: long2}})
            .then(distance => {
                if (distance) {
                    this.props.setDistanceState(distance.data.distance);
                }
                this.props.setPrevLocationState(markerArray);
            });
    }

    sendFindServerRequest(matchPattern, limitInt) {
        sendServerRequest({requestType: "find", requestVersion: 2, match: matchPattern, limit: limitInt})
            .then(places => {
                if (places) {
                    try {
                        let outerArray = [];
                        for(let i = 0; i < 5; ++i){
                            let elementArray = []
                            if(places.data.places[i] !== undefined) {
                                elementArray.push(places.data.places[i].name);
                                elementArray.push(places.data.places[i].latitude);
                                elementArray.push(places.data.places[i].longitude);
                            }
                            outerArray.push(elementArray);
                        }
                        this.setState({searchArray: outerArray, searchIsOn: true, numberFound: places.data.found});
                    }
                    catch(error){
                        console.error(error)
                    }
                }
            });
    }

    spacer(){return(<div className="px-1"/>);}
    switchToDistanceModule() {this.setState({showDistanceSearch: true, showLocationSearch: false, showWhereIsSearch: false});}
    switchToLocationModule() {this.setState({showDistanceSearch: false, showLocationSearch: true, showWhereIsSearch: false});}
    switchToWhereIsModule() {this.setState({showDistanceSearch: false, showLocationSearch: false, showWhereIsSearch: true});}
    toggleShowSearchModule() {this.setState({coreModule: !this.state.coreModule, showDistanceSearch: false, showLocationSearch: false, showWhereIsSearch: false,
        searchIsOn: false, searchTextFrom: "", searchTextTo: "", searchBarText: "", searchWhereIsTextTo: "", searchWhereIsTextFrom: "", distance: null, numberFound: 0, searchArray: [],});{this.switchToLocationModule()}}

}