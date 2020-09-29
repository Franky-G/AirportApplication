import {Button, Col, Input, Row, CustomInput, Container} from "reactstrap";
import React, {Component} from "react";
import searchButtonIcon from "../../static/images/magIcon.png";
import Zoom from "@material-ui/core/Zoom";
import {sendServerRequest} from "../../utils/restfulAPI";

export const calculateDistance = () => { console.log("placeholder function"); }

const inputFieldStyleFrom = {zIndex: 1002, height: 34, top: 10, left: 70, position: "absolute"}

const distanceButtonStyle = {
    position: "absolute", top: 11, left: -1, zIndex: 1005, height: 32, fontSize: 12, background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372"
}

const searchModuleStyle = {
    position: "absolute", backgroundColor: "#1E4D2B", width: 330, height: 150, borderRadius: "3px 3px 3px 3px",
    color: "#FFFFFF", borderColor: "rgba(0,0,0,0.3)", bottom: 13, left: 22, zIndex: 1012,
}

const searchTypeStyle = {
    position: "absolute", background: "#145906", color:"#FFFFFF", width: 320, height: 65, margin:5, top: 40,
    borderRadius: "3px 3px 3px 3px", fontSize: 18, textOverflow: "ellipsis", overflow: "hidden", border: "2px solid #000000", borderBottom: "3px solid #000000", borderTop: "3px solid #000000"
}
const radioButtonStyle = {color: "#FFFFFF", zIndex: 1100,}

let place1, place2, lat1, long1, lat2, long2;

export default class HelperFunctions extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            showDistanceSearch: false,
            showLocationSearch: false,
            searchModule: false,
            searchTextFrom: "",
            searchTextTo: "",
            searchBarText: "",
            distance: null,
            find: null,
        }
    }

    render() {
        return (
            <div>
                {this.addSearchButton()}
                {this.state.searchModule && this.renderSearchModule()}
            </div>
        );
    }

    renderCalculateButton = () => {
        return (<div><Button className="p-1" style={distanceButtonStyle} onClick={() => {this.calcDist()}}> Calculate </Button></div>)
    }

    renderSearchFieldTo() {
        return (<Input name="searchBarTo" placeholder="To" className="inputFieldSearchField" style={inputFieldStyleFrom}
                       color="primary" onChange={this.handleInputChange()}/>);
    }

    handleInputChange(){
        const target = event.target;
        if (target.name === "searchBarTo") {
            this.setState({searchTextTo: target.value});
        }
        if (target.name === "searchBarFrom") {
            this.setState({searchTextFrom: target.value});
        }
        if (target.name === "searchBar") {
            let coords = target.value.split(',');
            coords[0] = parseInt(coords[0]);
            coords[1] = parseInt(coords[1]);
            this.setState({searchBarText: coords});
        }
    }

    addSearchButton() {
        return (
            <div>
                <button className="home-btn" style={{top: 102, left: 25, zIndex: 1013}}
                        onClick={() => this.toggleShowSearchModule()}>
                    <span><img src={searchButtonIcon} style={{width: 16, height: "auto"}} title="Search" alt="search"/></span>
                </button>
            </div>
        );
    }

    toggleShowSearchModule() {
        this.setState({searchModule: !this.state.searchModule});
        this.switchToLocationModule()
    }

    switchToDistanceModule() {
        this.setState({showDistanceSearch: true, showLocationSearch: false});
    }

    switchToLocationModule() {
        this.setState({showDistanceSearch: false, showLocationSearch: true});
    }

    renderSearchModule() {
        return (
            <Zoom in={true} timeout={350}>
                <div style={searchModuleStyle}>
                    {this.state.showDistanceSearch && this.renderDistanceModule()}
                    {this.state.showLocationSearch && this.renderLocationModule()}
                    {this.renderRadioButtons()}
                </div>
            </Zoom>
        );
    }

    renderDistanceModule() {
        return (
            <div key="DistancePanel">
                <Row xs={2} key={"searchDistance"}>
                    <Col><Input name={"searchBarFrom"} style={{margin: 5, width: "100%"}} placeholder="From"
                                onChange={() => this.handleInputChange()}/></Col>
                    <Col style={{left: -20}}><Input name={"searchBarTo"} style={{margin: 5, width: 160}}
                                                    placeholder="To" onChange={() => this.handleInputChange()}/></Col>
                </Row>
                <Col style={{left: 265, top: 55}}>{this.renderCalculateButton()}</Col>
                <p style={searchTypeStyle}
                >
                    Coordinates:({this.state.searchTextFrom}),({this.state.searchTextTo})<br/>
                    Distance = {this.state.distance} miles
                </p>
            </div>
        );
    }

    renderLocationModule() {
        return (
            <div key="LocationPanel">
                <Row key={"searchDistance"}>
                    <Col><Input name={"searchBar"} style={{margin: 5, width: "97%"}}
                                placeholder="Enter name of place/coordinates"
                                onChange={() => this.handleInputChange()}/></Col>
                </Row>
                <Col style={{position: "absolute", left: 277, top: 103}}>
                    <div><Button className="p-1" style={distanceButtonStyle}
                                 onClick = {() =>this.props.setLatLngCoords(this.state.searchBarText)}> Search </Button></div>
                </Col>
                <p style={searchTypeStyle}
                >
                    Location/Coordinates:{this.state.searchBarText}<br/>
                    Location = {this.state.find}
                </p>
            </div>
        );
    }

    renderRadioButtons() {
        return (
            <Container style={{position: "absolute", top: 120, left: 10}}>
                <Row>
                    <CustomInput defaultChecked id="radioLocation" type="radio" name="searchRadioButton"
                                 onChange={() => {
                                     this.switchToLocationModule()
                                 }}/>
                    <label style={radioButtonStyle}>Location</label>
                    <div className="px-2"/>
                    <CustomInput id="radioDistance" type="radio" name="searchRadioButton" onChange={() => {this.switchToDistanceModule()}}/>
                    <label style={radioButtonStyle}>Distance</label>
                </Row>
            </Container>
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
            let place1 = this.props.sendFunction
            let place2 = this.props.sendFunctionPart2
            let lat1 = place1.lat.toString()
            let long1 = place1.lng.toString()
            let lat2 = place2.lat.toString()
            let long2 = place2.lng.toString()
            this.sendDistanceServerRequest(lat1, long1, lat2, long2)
        }
    }

    sendDistanceServerRequest(lat1, long1, lat2, long2) {
        sendServerRequest({requestType: "distance", requestVersion: 2, earthRadius: 3959,
            place1: {latitude: lat1, longitude: long1},
            place2: {latitude: lat2, longitude: long2}})
            .then(distance => {
                if (distance) {
                    this.setState({distance: distance.data.distance})
                }
            });
    }

    helperValidFromTo(index) {
        place1 = this.state.searchTextFrom.split(',')
        place2 = this.state.searchTextTo.split(',')
        lat1 = place1[0]
        long1 = place1[1]
        lat2 = place2[0]
        long2 = place2[1]
        if (index == 0) { this.sendDistanceServerRequest(lat1, long1, lat2, long2) }
        if (index == 1) {
            place2 = this.props.sendFunction
            let templat2 = place2.lat.toString()
            let templong2 = place2.lng.toString()
            this.sendDistanceServerRequest(lat1, long1, templat2, templong2)
        }
        if (index == 2) {
            place1 = this.props.sendFunction
            let tolat1 = place1.lat.toString()
            let tolong1 = place1.lng.toString()
            this.sendDistanceServerRequest(tolat1, tolong1, lat2, long2)
        }
    }
}