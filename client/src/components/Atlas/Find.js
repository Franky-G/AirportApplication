import {sendServerRequest} from "../../utils/restfulAPI";
import React, {Component} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import Fade from "@material-ui/core/Fade";
import {SListArrayHelper} from "../Cheese";


const distanceButtonStyle = {
    position: "absolute", top: 11, left: -1, zIndex: 1005, height: 32, fontSize: 12,
    background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372"
}

const filterButtonStyle = {
    position: "absolute", top: -31, left: -1, zIndex: 1005, height: 32, fontSize: 12,
    background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372"
}

const resetButtonStyle = {
    position: "absolute", top: -31, left: -85, zIndex: 1005, height: 32, fontSize: 12,
    background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372"
}

// const searchListStyle = {margin: 0, padding: 8, height: "100%", maxWidth: 268, color: "#FFFFFF", zIndex: 1009, fontSize: 13, borderRadius: "3px 3px 3px 3px", border: "2px solid #1E4D2B", background: "#002b0c"}

const searchBarArray = [{name: "searchBar", style: {margin: 5, width: "97%"}, placeholder: "Enter name of place"}];

const searchModuleStyle = {
    position: "absolute", backgroundColor: "#1E4D2B", width: 330, height: 150, borderRadius: "3px 3px 3px 3px",
    color: "#FFFFFF", borderColor: "rgba(0,0,0,0.3)", bottom: 13, left: 22, zIndex: 1013,
}

const searchTypeStyle = {
    position: "absolute", background: "#145906", color:"#FFFFFF", width: 320, height: 65, margin:5,
    top: 40, borderRadius: "3px 3px 3px 3px", fontSize: 13, textOverflow: "ellipsis", overflow: "hidden",
    border: "2px solid #000000", borderBottom: "3px solid #000000", borderTop: "3px solid #000000"
}

export default class Find extends Component {

    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleFilterModal = this.toggleFilterModal.bind(this);
        this.state = {
            numberFound: 0,
            searchArray: [],
            searchBarText: "",
            filterModalText: "",
            hasFilter: "no",
            isBalloon: false,
            isAirport: false,
            isHeliport: false,
            searchIsOn: false,
            isFilter: false
        }
    }

    render() {
        return (
            <div>
                {this.props.showLocationSearch && this.props.searchModule && this.renderLocationModule(searchBarArray)}
                {this.state.searchIsOn && this.renderSearchList()}
                {this.filterModal()}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    /* ------ Client ------ */

    addListGroupItem(index){
        return (
            <ListGroupItem className="styleSearchList" style={{maxWidth: 268}} tag="button" action
                           onClick={() => this.props.setWhereIsMarker(L.latLng(this.state.searchArray[index][1],
                               this.state.searchArray[index][2]))}>{this.state.searchArray[index][0]}</ListGroupItem>
        );
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({searchIsOn: false})
        }
    }

    handleInputChange(){
        const target = event.target;
        if (target.name === "searchBar") {this.setState({searchBarText: target.value});}
        if ("whereText" === target.name) {this.setState({filterModalText: target.value})}
    }

    toggleFilterModal(){this.setState({isFilter: !this.state.isFilter})}

    resetFilter(){
        this.setState({isAirport: false})
        this.setState({isBalloon: false})
        this.setState({isHeliport: false})
        this.setState({filterModalText: ""})
    }

    filterModal(){
        return (
          <Modal isOpen={this.state.isFilter} toggle={this.toggleFilterModal}>
              <ModalHeader toggle={this.toggleFilterModal}><b>Specify filters before searching</b></ModalHeader>
              <ModalBody>
                  <Form>
                      <FormGroup row>
                          <Label><b><em>Select Types</em></b></Label>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input type="checkbox" onChange={() => this.setState({isAirport: !this.state.isAirport})}/>{' '} Airport</Label></FormGroup></Col>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input onChange={() => this.setState({isBalloon: !this.state.isBalloon})} type="checkbox"/>{' '} Balloonport</Label></FormGroup></Col>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input type="checkbox" id="cheese" onChange={() => this.setState({isHeliport: !this.state.isHeliport})}/>{' '}Heliport</Label></FormGroup></Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label for="whereCheck"><b><em>Enter Country/Region name or Municipality below (Use a comma to specify more than one)</em></b></Label>
                          <Input type="textarea" name="whereText" id="whereFilter" onChange={() => this.handleInputChange()}/>
                      </FormGroup>
                  </Form>
              </ModalBody>
          </Modal>
        );
    }

    renderLocationModule(SBArray) {
        return (
            <Fade in={true} timeout={350}>
                <div style={searchModuleStyle}>
                    <Row>
                        <Col>
                            <Input name={SBArray[0].name} style={SBArray[0].style} placeholder={SBArray[0].placeholder}
                                   onChange={() => this.handleInputChange()}/>
                        </Col>
                    </Row>
                    <Col style={{position: "absolute", left: 277, top: 103}}>
                        <Button className="p-1" style={filterButtonStyle}
                                onClick = {() => {this.resetFilter(); this.toggleFilterModal()}}> Filters </Button>
                        <Button className="p-1" style={resetButtonStyle}
                                onClick = {() => {this.resetFilter()}}> Reset Filters </Button>
                        <Button className="p-1" style={distanceButtonStyle}
                                onClick = {() => {this.sendFindServerRequest(this.state.searchBarText, 20, this.setFilter())}}> Search </Button>
                    </Col>
                    <p style={searchTypeStyle}>
                        Location = {this.state.searchBarText}<br/>
                        Found = {this.state.numberFound}<br/>
                        Filters applied = {this.filterMessage()}
                    </p>
                </div>
            </Fade>
        );
    }

    renderSearchList(){
        let searchListArray = []
        let numFound = this.state.numberFound
        let maxFound = 20;
        for(let j = 0; j < numFound; j++){
            if(j >= maxFound){
                break;
            }
            searchListArray.push(this.addListGroupItem(j));
        }
        return(
            <div ref={this.setWrapperRef} tabIndex="0">
                <Container style={{padding: 0, position: "absolute", bottom: 162, left: 84, width: 280,
                    maxHeight: 230, overflow: "auto", zIndex: 1015}}>
                    <ListGroup onBlur={() => this.setState({searchIsOn: false})}>
                        <div onClick={() => this.setState({searchIsOn: false})}>
                            {SListArrayHelper(searchListArray)} </div>
                    </ListGroup>
                </Container>
            </div>
        );
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setFilterHelper(types, where){
        let temp = {}
        if (!(types.length === 0 && where.length === 0)) {
            temp = {
                type: types,
                where: where
            }
        }
        if (types.length !== 0 && where.length === 0){
            temp = { type: types }
        }
        if (types.length === 0 && where.length !== 0){
            temp = { where: where }
        }
        return temp
    }

    setFilter(){
        let types = []
        let where = []
        let regex = /,\s*/
        if (this.state.isAirport){ types.push("airport")}
        if (this.state.isBalloon){ types.push("balloonport") }
        if (this.state.isHeliport){ types.push("heliport") }
        if (this.state.filterModalText !== "") { where = this.state.filterModalText.split(regex) }
        return this.setFilterHelper(types, where)
    }

    /* ------- Server ------- */

    sendFindServerRequest(matchPattern, limitInt, map) {
        sendServerRequest({requestType: "find", requestVersion: 2, match: matchPattern, limit: limitInt, narrow: map})
            .then(fin => {
                if (fin) {
                    try {
                        let oArr = [];
                        let eArr = []
                        for (let j = 0; j < limitInt; ++j) {
                            if (fin.data.places[j] !== undefined) {
                                eArr = this.sFSReqHelper(fin.data.places[j].name, fin.data.places[j].latitude, fin.data.places[j].longitude)
                            }
                            oArr.push(eArr);
                        }
                        if(matchPattern === "78LuckyBoy78"){
                            return this.props.setWhereIsMarker(L.latLng(oArr[0][1], oArr[0][2]));
                        }
                        this.setState({searchArray: oArr, searchIsOn: true, numberFound: fin.data.found});
                    } catch (error) {
                        console.error(error)
                    }
                }
            });
    }

    sFSReqHelper(name, lat, long){
        let eArr = []
        eArr.push(name)
        eArr.push(lat)
        eArr.push(long)
        return eArr
    }

    filterMessage() {
        if (this.state.isAirport || this.state.isBalloon || this.state.isHeliport || this.state.filterModalText !== ""){ return "YES"}
        else{ return "NO" }
    }
}

