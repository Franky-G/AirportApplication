import {Button, Col, Input, Row} from "reactstrap";
import React, {Component} from "react";
import searchButtonIcon from "../../static/images/magIcon.png";
import Zoom from "@material-ui/core/Zoom";
import {sendServerRequest} from "../../utils/restfulAPI";
import WhereIs from "./WhereIs";
import RadioButtons from "./RadioButtons";
import Find from "./Find";

const inputFieldStyleFrom = {zIndex: 1002, height: 34, top: 10, left: 70, position: "absolute"}

export default class SearchModule extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.switchToWhereIsModule = this.switchToWhereIsModule.bind(this);
        this.switchToDistanceModule = this.switchToDistanceModule.bind(this);
        this.switchToLocationModule = this.switchToLocationModule.bind(this);
        this.searchBarCoordsIntermediate = this.searchBarCoordsIntermediate.bind(this);
        this.state = {
            showDistanceSearch: false, showLocationSearch: false, showWhereIsSearch: false,
            searchModule: false, searchTextFrom: "", searchTextTo: "",
            distance: null, searchPrevLocation: [null, null]
        }
    }

    render() {
        return (
            <div>
                {this.addSearchButton()}
                {this.renderLuckyButton()}
                <RadioButtons {...this.state}
                              switchToDistanceModule={this.switchToDistanceModule}
                              switchToLocationModule={this.switchToLocationModule}
                              switchToWhereIsModule={this.switchToWhereIsModule}/>
                <WhereIs {...this.state}
                         searchBarCoordsIntermediate={this.searchBarCoordsIntermediate}/>
                <Find {...this.state} {...this.props} ref={(ref) => this.findREF=ref}/>
                {this.state.searchModule && this.renderSearchModule()}
            </div>
        );
    }

    addSearchButton() {
        return (
            <div>
                <button className="home-btn" style={{top: 133, left: 25, zIndex: 1017, borderRadius: "0px 0px 0px 0px"}}
                        onClick={() => this.toggleShowSearchModule()}>
                    <span><img src={searchButtonIcon} style={{width: 16, height: "auto"}} title="Search" alt="search"/></span>
                </button>
            </div>
        );
    }

    async formatDistanceCoords() {
        let fromCoords = "", toCoords = "";
        try {
            let cordParse = require('coordinate-parser');
            if(this.state.searchTextFrom){
                fromCoords = new cordParse(this.state.searchTextFrom).getLatitude()+','+new cordParse(this.state.searchTextFrom).getLongitude()
            }
            if(this.state.searchTextTo){
                let toCoordsParse = new cordParse(this.state.searchTextTo);
                toCoords = toCoordsParse.getLatitude()+','+toCoordsParse.getLongitude();
            }
            await this.setState({searchTextFrom: fromCoords, searchTextTo: toCoords})
            this.calcDist()
        }
        catch (error){
            alert("Invalid Coordinate Input!")
        }
    }

    handleInputChange() {
        const target = event.target;
        if (target.name === "searchBarTo") {
            this.setState({searchTextTo: target.value});
        } if (target.name === "searchBarFrom") {
            this.setState({searchTextFrom: target.value});
        }
    }

    toggleShowSearchModule() {
        this.setState({searchModule: !this.state.searchModule, showDistanceSearch: false, showLocationSearch: null, showWhereIsSearch: false,
            searchIsOn: false, searchTextFrom: "", searchTextTo: "", distance: null, numberFound: 0, searchArray: [],});
        {this.switchToLocationModule()}
    }

    switchToDistanceModule() { this.setState({ showDistanceSearch: true, showLocationSearch: false, showWhereIsSearch: false}); }
    switchToLocationModule() { this.setState({ showDistanceSearch: false, showLocationSearch: true, showWhereIsSearch: false}); }
    switchToWhereIsModule() { this.setState({ showDistanceSearch: false, showLocationSearch: false, showWhereIsSearch: true}); }


    renderCalculateButton = () => {
        return (<div><Button className="p-1 distanceButtonStyle" style={{color: "#000000", fontSize: 12, border: "1px solid #C8C372"}}
                             onClick={() => {this.formatDistanceCoords()}}> Calculate </Button></div>)
    }

    renderLuckyButton() {
        return(
            <button className="home-btn" style={{position: "absolute", left: 25, top: 102, zIndex: 1016}} onClick={() => this.findREF.sendFindServerRequest("78LuckyBoy78", 1, {})}>L</button>
        );
    }

    renderSearchFieldTo() {
        return (<Input name="searchBarTo" placeholder="To" className="inputFieldSearchField" style={inputFieldStyleFrom}
                       color="primary" onChange={this.handleInputChange()}/>);
    }

    renderSearchModule() {
        return (
            <Zoom in={true} timeout={350}>
                <div style={{zIndex: 1009}} className="searchModuleStyle">
                    {this.state.showDistanceSearch && this.renderDistanceModule()}
                </div>
            </Zoom>
        );
    }

    renderDistanceModule() {
        return (
            <div key="DistancePanel">
                <Row xs={2} key={"searchDistance"}>
                    <Col><Input name={"searchBarFrom"} style={{margin: 5, width: "100%"}} placeholder="From: (Lat,Lng)"
                                onChange={() => this.handleInputChange()}/></Col>
                    <Col style={{left: -20}}><Input name={"searchBarTo"} style={{margin: 5, width: 160}}
                                                    placeholder="To: (Lat,Lng)"
                                                    onChange={() => this.handleInputChange()}/></Col>
                </Row>
                <Col style={{left: 265, top: 55}}>{this.renderCalculateButton()}</Col>
                <p className="searchTypeStyle">
                    Use Search Bars Or Click On Map<br/>
                    Distance = {this.state.distance} miles
                </p>
            </div>
        );
    }

    searchBarCoordsIntermediate(coords){
        this.props.setSearchBarCoords(coords);
    }

    calcDist() {
        if (this.state.searchTextFrom && this.state.searchTextTo) {
            this.sendDistanceServerRequest(this.state.searchTextFrom.split(',')[0], this.state.searchTextFrom.split(',')[1],
                this.state.searchTextTo.split(',')[0], this.state.searchTextTo.split(',')[1])
        }
        this.helperCalCDist()
        if (!this.state.searchTextFrom && !this.state.searchTextTo) {
            let place1 = this.props.prevLocation[0];
            let place2 = this.props.prevLocation[1];
            if (this.props.prevLocation[1] !== null)
                this.sendDistanceServerRequest(place1.lat.toString(), place1.lng.toString(), place2.lat.toString(), place2.lng.toString());
        }
    }

    helperCalCDist() {
        if (this.state.searchTextFrom && !this.state.searchTextTo) {
            this.sendDistanceServerRequest(this.state.searchTextFrom.split(',')[0], this.state.searchTextFrom.split(',')[1],
                this.props.prevLocation[0].lat.toString(), this.props.prevLocation[0].lng.toString())
        }
        if (!this.state.searchTextFrom && this.state.searchTextTo) {
            this.sendDistanceServerRequest(this.props.prevLocation[0].lat.toString(), this.props.prevLocation[0].lng.toString(),
                this.state.searchTextTo.split(',')[0], this.state.searchTextTo.split(',')[1])
        }
    }

    sendDistanceServerRequest(lat1, long1, lat2, long2) {
        let markerArray = [L.latLng(lat1, long1), L.latLng(lat2, long2)];
        if (this.state.searchTextFrom !== "") {
            this.props.setSearchTextIsEmpty(false);
        }
        sendServerRequest({
            requestType: "distance", requestVersion: 2, earthRadius: 3959,
            place1: {latitude: lat1, longitude: long1},
            place2: {latitude: lat2, longitude: long2}
        })
            .then(distance => {
                this.setState({distance: distance.data.distance})
                this.props.setPrevLocationState(markerArray, distance.data.distance);
            });
    }
}


