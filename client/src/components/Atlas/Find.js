import {sendServerRequest} from "../../utils/restfulAPI";
import React, {Component} from "react";
import {Button, Col, Container, Input, ListGroup, ListGroupItem, Row, Modal, ModalBody, ModalHeader, Form, FormGroup, Label} from "reactstrap";
import Fade from "@material-ui/core/Fade";
import {SListArrayHelper} from "../Cheese";


const distanceButtonStyle = {
    position: "absolute", top: 11, left: -1, zIndex: 1005, height: 32, fontSize: 12,
    background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372"
}

const filterButtonStyle = {
    position: "absolute", top: -31, left: 10, zIndex: 1005, height: 32, fontSize: 12,
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
    top: 40, borderRadius: "3px 3px 3px 3px", fontSize: 16, textOverflow: "ellipsis", overflow: "hidden",
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
            map: {},
            searchBarText: "",
            filterModalText: "",
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
        if (target.name === "whereText") {this.setState({filterModalText: target.value})}
    }

    toggleFilterModal(){ this.setState({isFilter: !this.state.isFilter}) }

    toggleAirport(){ this.setState({isAirport: !this.state.isAirport})}

    toggleBalloon(){ this.setState({isBalloon: !this.state.isBalloon})}

    toggleHeliport(){ this.setState({isHeliport: !this.state.isHeliport})}

    filterModal(){
        return (
          <Modal isOpen={this.state.isFilter} toggle={this.toggleFilterModal}>
              <ModalHeader toggle={this.toggleFilterModal}><b>Specify filters before searching</b></ModalHeader>
              <ModalBody>
                  <Form>
                      <FormGroup row>
                          <Label><b><em>Select Types</em></b></Label>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input type="checkbox" onChange={this.toggleAirport.bind(this)}/>{' '} Airport</Label></FormGroup></Col>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input type="checkbox" onChange={this.toggleBalloon.bind(this)}/>{' '} Balloonport</Label></FormGroup></Col>
                          <Col sm={{size:10}}><FormGroup check><Label check><Input type="checkbox" onChange={this.toggleHeliport.bind(this)}/>{' '} Heliport</Label></FormGroup></Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label for="whereCheck"><b><em>Enter Country/Region name or Municipality below (Use a comma to specify more than one)</em></b></Label>
                          <Input type="textarea" name="whereText" id="whereFilter" onChange={() => this.handleInputChange()}/>
                      </FormGroup>
                      <Input type="submit" onClick={() => this.sendConfigServerRequest()}>Submit</Input>
                  </Form>
              </ModalBody>
          </Modal>
        );
    }

    renderLocationModule(SBArray) {
        return (
            <Fade in={true} timeout={350}>
                <div style={searchModuleStyle}>
                    <Button className="p-1" style={filterButtonStyle}
                            onClick = {() => {this.toggleFilterModal()}}> Filters </Button>
                    <Row>
                        <Col>
                            <Input name={SBArray[0].name} style={SBArray[0].style} placeholder={SBArray[0].placeholder}
                                   onChange={() => this.handleInputChange()}/>
                        </Col>
                    </Row>
                    <Col style={{position: "absolute", left: 277, top: 103}}>
                        <Button className="p-1" style={distanceButtonStyle}
                                onClick = {() => {this.returnPlaces()}}> Search </Button>
                    </Col>
                    <p style={searchTypeStyle}>
                        Location = {this.state.searchBarText}<br/>
                        Found = {this.state.numberFound}
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

    setFilter(){
        const temp = new Map()
        console.log("temp is initially " + temp)
        const types = ["airport", "balloonport", "heliport"];
        let where = []
        if (!this.state.isAirport){ delete types[0] }
        if (!this.state.isBalloon){ delete types[1] }
        if (!this.state.isHeliport){ delete types[2] }
        where.push(this.state.filterModalText)
        temp.set("type", types)
        temp.set("where", where)
        console.log("temp is now " + temp)
        return(
          temp
        );
    }

    /* ------- Server ------- */

    returnPlaces() {
        this.sendFindServerRequest(this.state.searchBarText, 20, this.state.map)
    }

    sendFindServerRequest(matchPattern, limitInt, map) {
        sendServerRequest({requestType: "find", requestVersion: 2, match: matchPattern, limit: limitInt, narrow: map})
            .then(fin => {
                if (fin) {
                    try {
                        let outerArray = [];
                        for (let i = 0; i < limitInt; ++i) {
                            let elementArray = []
                            if (fin.data.places[i] !== undefined) {
                                elementArray.push(fin.data.places[i].name);
                                elementArray.push(fin.data.places[i].latitude);
                                elementArray.push(fin.data.places[i].longitude);
                            }
                            outerArray.push(elementArray);
                        }
                        this.setState({searchArray: outerArray, searchIsOn: true, numberFound: fin.data.found});
                    } catch (error) {
                        console.error(error)
                    }
                }
            });
    }

    sendConfigServerRequest(){
        const tempMap = this.setFilter()
        sendServerRequest({requestType: "config", requestVersion: 4})
            .then(conf => {
                if (conf) {
                    this.setState({map: conf.data.filters})
                }
            });
    }
}

