import {Button, Col, Container, CustomInput, Input, Row} from "reactstrap";
import Fade from "@material-ui/core/Fade";
import React, {Component} from "react";
import searchButtonIcon from "../../static/images/magIcon.png";
import Zoom from "@material-ui/core/Zoom";

export const helperSetCurrentSearchBar = (temp) => {
    return ( <Container><Fade id="searchCollapse" in={temp.info} style={{zIndex: 1010}}>{temp.extra}</Fade></Container> )
}

export const calculateDistance = () => { console.log("placeholder function"); }

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

export default class HelperFunctions extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchTextTo: "",
            searchTextFrom: "",
            searchBarText: "",
            showDistanceSearch: false,
            showLocationSearch: false,
            searchModule: false,
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
        return( <div><Button className="p-1" style={distanceButtonStyle} onClick={() => calculateDistance}> Calculate </Button></div> )
    }

    handleInputChange = () => {
        const target = event.target;
        if(target.name === "searchBarTo"){
            this.setState({searchTextTo: target.value});
        }
        if(target.name === "searchBarFrom"){
            this.setState({searchTextFrom: target.value});
        }
        if(target.name === "searchBar"){
            this.setState({searchBarText: target.value});
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

    toggleShowSearchModule() {this.setState({searchModule: !this.state.searchModule});{this.switchToLocationModule()}}
    switchToDistanceModule() {this.setState({showDistanceSearch: true, showLocationSearch: false});}
    switchToLocationModule() {this.setState({showDistanceSearch: false, showLocationSearch: true});}

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
                    Coordinates:[{this.props.searchTextFrom}],[{this.props.searchTextTo}]<br/>
                    Distance = OVER 9000
                </p>
            </div>
        );
    }

    renderLocationModule() {
        return (
            <div key="LocationPanel">
                <Row key={"searchDistance"}>
                    <Col><Input name={"searchBarFrom"} style={{margin: 5, width: "97%"}}
                                placeholder="Enter name of place/coordinates"
                                onChange={() => this.handleInputChange}/></Col>
                </Row>
                <Col style={{position: "absolute", left: 277, top: 103}}>
                    <div><Button className="p-1" style={distanceButtonStyle}
                                 onClick={() => calculateDistance()}> Search </Button></div>
                </Col>
                <p style={searchTypeStyle}
                >
                    Location/Coordinates:{this.state.searchTextFrom}<br/>
                    Location = UR MUMS HAU5
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
                    <CustomInput id="radioDistance" type="radio" name="searchRadioButton" onChange={() => {
                        this.switchToDistanceModule()
                    }}/>
                    <label style={radioButtonStyle}>Distance</label>
                </Row>
            </Container>
        );
    }
}


