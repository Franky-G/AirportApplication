import {Button, ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row} from "reactstrap";
import Fade from "@material-ui/core/Fade";
import React, {Component} from "react";
import searchButtonIcon from "../../static/images/magIcon.png";

export const helperRenderFunction = (temp) => {
    return ( <Input key={"HelperFunction"} name = {temp.name} placeholder = {temp.place} className = {temp.classname} style = {temp.style} color={temp.color} onChange={temp.change}/> )
}

export const helperSetCurrentSearchBar = (temp) => {
    return ( <Container><Fade id="searchCollapse" in={temp.info} style={{zIndex: 1010}}>{temp.extra}</Fade></Container> )
}

export const calculateDistance = () => { console.log("placeholder function"); }

const inputFieldStyleFrom = {
    zIndex: 1002,
    height: 34,
    top: 10,
    left: 70,
    position: "absolute",
}

const inputFieldStyleSearchBar = {
    zIndex: 1002,
    height: 34,
    bottom: 10,
    left: 50,
    position: "absolute",
}

const distanceButtonStyle = {
    position: "absolute",
    top: 11,
    left: -1,
    zIndex: 1005,
    height: 32,
    fontSize: 12,
    backgroundColor: "#1E4D2B",
}

const dropdownStyle = {
    position: "absolute",
    left: 10,
    top: 100,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
    padding: "none",
    cursor: "pointer",
    outline: "none",
    zIndex: 1010,
}

export default class HelperFunctions extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchTextTo: "",
            searchTextFrom: "",
            searchBarText: "",
            buttonDropdown: false,
            showDistanceSearch: false,
            showLocationSearch: false,
        }
    }

    render() {
        return (
            <div>
                {this.addDropdownButton()}
                {this.setCurrentSearchBar()}
            </div>
        );
    }

    setCurrentSearchBar(){
        let searchField = [{info: this.state.showDistanceSearch, extra: this.renderSearchField()}, {info: this.state.showLocationSearch, extra: this.renderSearchBar()}]
        return( <div>{searchField.map(helperSetCurrentSearchBar)}</div> );
    }

    renderSearchBar(){
        let searchbar = [{name: "searchBar", place: "Search Location", classname: "inputFieldSearchBar", style: inputFieldStyleSearchBar, color: "primary", change: this.handleInputChange}]
        return( <div>{searchbar.map(helperRenderFunction)}</div> );
    }

    renderSearchField(){
        let helpSearchField = [{name: "searchBarFrom", place: "From", classname: "inputFieldSearchField", style: inputFieldStyleFrom, color: "primary", change: this.handleInputChange}]
        return(
            <div><Row xs="3">
                <Col>{helpSearchField.map(helperRenderFunction)}</Col>
                <Col>{this.renderSearchFieldTo()}</Col>
                <Col>{this.renderCalculateButton()}</Col>
            </Row></div> );
    }

    renderCalculateButton = () => {
        return( <div><Button className="p-1" style={distanceButtonStyle} onClick={() => calculateDistance}> Calculate </Button></div> )
    }

    renderSearchFieldTo(){
        return ( <Input name="searchBarTo" placeholder="To" className="inputFieldSearchField" style={inputFieldStyleFrom} color="primary" onChange={this.handleInputChange}/> );
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

    addDropdownButton(){
        return(
            <div style={{position: "absolute"}}>
                <ButtonDropdown  isOpen={this.state.buttonDropdown} toggle={() => this.toggleButtonDropdown()}>
                    <DropdownToggle caret style={dropdownStyle}><img className="searchImg" src={searchButtonIcon} alt="S" title="Search"/></DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><div onClick={() => this.toggleSearchDistance()}> Distance </div></DropdownItem>
                        <DropdownItem><div onClick={() => this.toggleSearchLocation()}> Location </div></DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }

    toggleSearchDistance(){ this.setState({showDistanceSearch: !this.state.showDistanceSearch}); }
    toggleSearchLocation(){ this.setState({showLocationSearch: !this.state.showLocationSearch}); }
    toggleButtonDropdown(){ this.setState({buttonDropdown: !this.state.buttonDropdown}); }
}


