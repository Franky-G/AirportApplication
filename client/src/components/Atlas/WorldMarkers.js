import React, {Component} from "react";
import {Marker, Polyline, Popup} from "react-leaflet";
import homeMarker from "../../static/images/youAreHereMarker.png";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Modal, ModalBody, ModalHeader, Label, Input, Row} from "reactstrap";
import Slider from '@material-ui/core/Slider';
import blueIcon from "../../static/images/blueMarker.png";
import redIcon from "../../static/images/redMarker.png";
import greenIcon from "../../static/images/greenMarker.png";
import orangeIcon from "../../static/images/orangeMarker.png";
import pinIcon from "../../static/images/pinMarker.png";
//import homeIcon from "../../static/images/homeButtonIcon.png";

const icon1 = new L.Icon({iconUrl: blueIcon, iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon2 = new L.Icon({iconUrl: redIcon, iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon3 = new L.Icon({iconUrl: greenIcon, iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon4 = new L.Icon({iconUrl: orangeIcon, iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon5 = new L.Icon({iconUrl: pinIcon, iconSize: new L.Point(30, 33), iconAnchor: [9, 27]});
const icon6 = new L.Icon({iconUrl: icon, iconSize: new L.Point(30, 40), iconAnchor: [15, 40]});
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});
const lineArray = [{state: "", label: "Solid"}, {state: "7 8", label: "Dashed"}, {state: "24 10 8 10", label: "Dotted"}]
const markerArray =[{source: "https://imgur.com/Wr4R0ei.jpg", label: "Blue", icon: icon1}, {source: "https://imgur.com/S9WRG9G.jpg", label: "Red", icon: icon2},
    {source: "https://imgur.com/fyKEMnS.jpg", label: "Green", icon: icon3}, {source: "https://imgur.com/lgn5Mpi.jpg", label: "Orange", icon: icon4}, {source: "https://imgur.com/wsuH1XQ.jpg", label: "Pin", icon: icon5},
    {source: icon, label: "Default", icon: icon6}]

export default class WorldMarkers extends Component {

    constructor(props) {
        super(props);
        this.setModalRef = this.setModalRef.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.state = {
            marker: icon, lineType: null, lineColor: "green", lineWeight: 3, settingsOpen: false, dashes: "", markerOpen: false, markerNumber: 0,
            togglePolyline: true, toggleMarker: true,
        }
    }

    render(){
        return(
            <div>
                {this.getHomeMarker()}
                {this.state.toggleMarker && this.getMarker()}
                {this.changeSettings()}
                {this.props.whereIsMarker && this.renderWhereIsMarker()}
                {this.state.togglePolyline && this.makePolyline()}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.contains(event.target)) {
            this.toggleSettings()
        }
    }

    setModalRef(node) {
        this.modalRef = node;
    }

    addAMarker(markerType){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup()}};
        let positionMarker;
        if(markerType < 2) {
            positionMarker = this.props.prevLocation[markerType]
        } else {
            positionMarker = this.props.atlasTripPlaces[markerType - 3][0]
        }
        return(
            <div>
                <Marker key={markerType} ref={initMarker} position={positionMarker} icon={markerArray[this.state.markerNumber].icon}/>
            </div>
        );
    }

    formatSettings(){
        return(
            <div>
                <p className="vertical-center">Color: <span style={{width: 40}}/>
                    {this.helperLabelColor("Blue")} <div className="px-3"/>
                    {this.helperLabelColor("Red")} <div className="px-3"/>
                    {this.helperLabelColor("Green")} <div className="px-3"/>
                    {this.helperLabelColor("Purple")} <div className="px-3"/>
                    {this.helperLabelColor("Black")} <div className="px-3"/>
                </p>
                <p className="vertical-center"> Line type: <span style={{width: 30}}/>
                    {this.helperLabelLines(lineArray, 0)} <div className="px-3"/>
                    {this.helperLabelLines(lineArray, 1)} <div className="px-3"/>
                    {this.helperLabelLines(lineArray, 2)} <div className="px-3"/>
                </p>
                <Row style={{height: 80}}>
                    <div className="px-3"/> {this.helperMarkerButton(0)}
                    {this.helperMarkerButton(1)}
                    {this.helperMarkerButton(2)}
                    {this.helperMarkerButton(3)}
                    {this.helperMarkerButton(4)}
                    {this.helperMarkerButton(5)}
                </Row>
                <Row><div className="px-3"/> Markers courtesy of: <span className="px-1"/><a href="https://www.vecteezy.com/vector-art/646870-mapping-pins-icon">{" "}Vecteezy</a></Row>
            </div>
        );
    }

    changeSettings(){
        return(
            <div ref={this.setModalRef} tabIndex="0">
                <Modal isOpen={this.state.settingsOpen} toggle={this.toggleSettings}>
                    <ModalHeader toggle={() => this.toggleSettings(3)}><b>Marker and Line Settings</b></ModalHeader>
                    <ModalBody>
                        <p className="vertical-center">Line Width: {this.state.lineWeight} <span style={{width: 30}}/>
                            <Slider style={{width:300}} value={this.state.lineWeight} max={10} min={1} step={1}
                                    onChange={(event,value) => {if(this.checkSlider()){alert("Add 2 Points First"); this.blur()} else {this.setState({lineWeight: value})}}}/>
                        </p>
                        {this.formatSettings()}
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    helperLabelColor(color){
        return(
            <div>
                <Label check><Input type="radio" name="radio1" onChange={() => this.setState({lineColor: color})}/>{color}</Label>
            </div>
        );
    }

    helperLabelLines(array, index){
        return(
            <div>
                <Label check><Input type="radio" name="radio2" onChange={() => this.setState({dashes: array[index].state})}/>{array[index].label}</Label>
            </div>
        )
    }

    helperMarkerButton(index){
        return(
            <button  style={{top: 5, width: 70, height: 70, backgroundColor: "#FFFFFF", border: "2px solid #1E4D2B", borderRadius: "10px"}}>
                <span><img src={markerArray[index].source} style={{width: 50, height: 55}} title={markerArray[index].label} onClick={() => this.setState({markerNumber: index})} alt="Marker Type"/></span>
            </button>
        );
    }

    checkSlider(){
        if(this.props.atlasTripPlaces.length < 2){
            return this.props.prevLocation[1] === null;
        }
        if(this.props.prevLocation[1] === null){
            return this.props.atlasTripPlaces.length < 2;
        }
    }

    getHomeMarker(){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        if (this.props.homeLocation){
            return (
                <Marker ref={initMarker} position={this.props.homeLocation} icon={HOME_MARKER}/>
            )
        }
    }

    getMarker() {
        let markerSet = [];
        for (let i = 0; i < 2; ++i) {
            if (this.props.prevLocation[i] !== null) { markerSet.push(this.addAMarker(i)); }
        }
        for (let i = 3; i < this.props.atlasTripPlaces.length + 3; ++i) {
            { markerSet.push(this.addAMarker(i)); }
        }
        return ( <div>{markerSet.map((element, index) => (<div key={index}>{element}</div>))} </div> );
    }

    openSettings(){
        this.setState({polyOpen: !this.state.polyOpen})
    }

    renderWhereIsMarker(){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        return (
            <Marker ref={initMarker} position={this.props.whereIsMarker} icon={markerArray[this.state.markerNumber].icon}/>
        );
    }

    makePolyline(){
        let array = [];
        for(let i = 0; i < this.props.atlasTripPlaces.length; ++i){
            array.push(this.props.atlasTripPlaces[i][0])
        }
        if(this.props.atlasTripPlaces.length === 0){
            array.push(this.props.prevLocation[0])
            array.push(this.props.prevLocation[1])
        }
        if((array[0] !== null && array[1] !== null) || (this.props.prevLocation[0] !== null && this.props.prevLocation[1] !== null)) {
            return (this.renderPolyline(array));
        }
    }

    renderPolyline(array){
        let placesPoly = this.props.atlasTripPlaces.length >= 2;
        let distancePoly = this.props.prevLocation[1] !== null;
        const initMarker = ref => {if (ref) {ref.leafletElement.openPopup()}}
        return(
            <div>
                {placesPoly && <Polyline color={this.state.lineColor} weight={this.state.lineWeight} dashArray={this.state.dashes} positions={array}/>}
                {distancePoly && <Polyline ref={initMarker} color={this.state.lineColor} weight={this.state.lineWeight} dashArray={this.state.dashes} positions={this.props.prevLocation} >
                    <Popup autoPan={false} className="popupStyle">
                        Distance: {this.props.polyDistance} M
                    </Popup>
                </Polyline>}
            </div>
        );
    }

    toggleSettings(value){
        if(value === 0) {
            this.setState({togglePolyline: !this.state.togglePolyline})
        } else if(value === 1) {
            this.setState({toggleMarker: !this.state.toggleMarker})
        } else {
            this.setState({settingsOpen: !this.state.settingsOpen})
        }
    }
}
