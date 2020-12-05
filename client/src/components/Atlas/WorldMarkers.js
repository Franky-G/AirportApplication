import React, {Component} from "react";
import {Marker, Polyline, Popup} from "react-leaflet";
import homeMarker from "../../static/images/youAreHereMarker.png";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Modal, ModalBody, ModalHeader, Label, Input, Row} from "reactstrap";
import Slider from '@material-ui/core/Slider';
//import homeIcon from "../../static/images/homeButtonIcon.png";

const icon1 = new L.Icon({iconUrl: "https://imgur.com/Wr4R0ei.jpg", iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon2 = new L.Icon({iconUrl: 'https://imgur.com/S9WRG9G.jpg', iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon3 = new L.Icon({iconUrl: 'https://imgur.com/fyKEMnS.jpg', iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon4 = new L.Icon({iconUrl: 'https://imgur.com/lgn5Mpi.jpg', iconSize: new L.Point(30, 33), iconAnchor: [15, 32]});
const icon5 = new L.Icon({iconUrl: 'https://imgur.com/wsuH1XQ.jpg', iconSize: new L.Point(30, 33), iconAnchor: [9, 27]});
const icon6 = new L.Icon({iconUrl: icon, iconSize: new L.Point(30, 40), iconAnchor: [15, 40]});
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});
const lineArray = [{state: "", label: "Solid"}, {state: "7 8", label: "Dashed"}, {state: "24 10 8 10", label: "Dotted"}]
const markerArray =[{source: "https://imgur.com/Wr4R0ei.jpg", label: "Blue", icon: icon1}, {source: "https://imgur.com/S9WRG9G.jpg", label: "Red", icon: icon2},
    {source: "https://imgur.com/fyKEMnS.jpg", label: "Green", icon: icon3}, {source: "https://imgur.com/lgn5Mpi.jpg", label: "Orange", icon: icon4}, {source: "https://imgur.com/wsuH1XQ.jpg", label: "Pin", icon: icon5},
    {source: icon, label: "Default", icon: icon6}]

export default class WorldMarkers extends Component {

    constructor(props) {
        super(props);
        this.setModalRef = this.setModalRef.bind(this);
        this.setModalRef1 = this.setModalRef1.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.state = {
            marker: icon, lineType: null, lineColor: "green", lineWeight: 3, polyOpen: false, dashes: "", markerOpen: false, markerNumber: 5,
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
            this.openPolylineOptions()
        }
        if (this.modalRef1 && !this.modalRef1.contains(event.target)) {
            this.openMarkerOptions()
        }
    }

    setModalRef(node) {
        this.modalRef = node;
    }

    setModalRef1(node) {
        this.modalRef1 = node;
    }

    addAMarker(markerType){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup()}};
        let positionMarker = MAP_CENTER_DEFAULT;
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
                    {this.helperLabelColor("Blue")} {this.colorSpacer()}
                    {this.helperLabelColor("Red")} {this.colorSpacer()}
                    {this.helperLabelColor("Green")} {this.colorSpacer()}
                    {this.helperLabelColor("Purple")} {this.colorSpacer()}
                    {this.helperLabelColor("Black")} {this.colorSpacer()}
                </p>
                <p className="vertical-center"> Line type: <span style={{width: 30}}/>
                    {this.helperLabelLines(lineArray, 0)} {this.colorSpacer()}
                    {this.helperLabelLines(lineArray, 1)} {this.colorSpacer()}
                    {this.helperLabelLines(lineArray, 2)} {this.colorSpacer()}
                </p>
                <Row style={{height: 80}}>
                    {this.colorSpacer()} {this.helperMarkerButton(0)}
                    {this.helperMarkerButton(1)}
                    {this.helperMarkerButton(2)}
                    {this.helperMarkerButton(3)}
                    {this.helperMarkerButton(4)}
                    {this.helperMarkerButton(5)}
                </Row>
                <Row>{this.colorSpacer()}Markers courtesy of: <span className="px-1"/><a href="https://www.vecteezy.com/vector-art/646870-mapping-pins-icon">{" "}Vecteezy</a></Row>
            </div>
        );
    }

    changeSettings(){
        return(
            <div ref={this.setModalRef} tabIndex="0">
                <Modal isOpen={this.state.polyOpen} toggle={this.openSettings}>
                    <ModalHeader toggle={() => this.openSettings()}><b>Marker and Line Settings</b></ModalHeader>
                    <ModalBody>
                        <p className="vertical-center">Line Width: {this.state.lineWeight} <span style={{width: 30}}/>
                            <Slider style={{width:300}} value={this.state.lineWeight} max={10} min={1} step={1}
                                    onChange={(event,value) => {if(this.checkSlider()){alert("Add 2 Points First");this.blur()} this.sliderChange(value)}}/>
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

    colorSpacer(){
        return(
            <div className="px-3"/>
        );
    }

    checkSlider(){
        return (this.props.atlasTripPlaces[1] === "" || this.props.prevLocation[1] === null);
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
        if (this.props.atlasTripPlaces !== null)
            for (let i = 3; i < this.props.atlasTripPlaces.length + 3; ++i) {
                 { markerSet.push(this.addAMarker(i)); }
            }
        return ( <div>{markerSet.map((element, index) => (<div key={index}>{element}</div>))} </div> );
    }

    sliderChange(value){
        this.setState({lineWeight: value});
    }

    openSettings(){
        this.setState({polyOpen: !this.state.polyOpen})
    }

    renderWhereIsMarker(){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        return (
            <Marker ref={initMarker} position={this.props.whereIsMarker} icon={MARKER_ICON}/>
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
        if(array[0] !== null && array[1] !== null && this.props.prevLocation[0] !== null && this.props.prevLocation[1] !== null) {
            return (this.renderPolyline(array));
        }
        if(array[0] !== null && array[1] !== null){
            return(<Polyline color={this.state.lineColor} weight={this.state.lineWeight} dashArray={this.state.dashes} positions={array}/>);
        }
    }

    renderPolyline(array){
        const initMarker = ref => {if (ref) {ref.leafletElement.openPopup()}}
        return(
            <div>
                <Polyline color={this.state.lineColor} weight={this.state.lineWeight} dashArray={this.state.dashes} positions={array}/>
                <Polyline ref={initMarker} color={this.state.lineColor} weight={this.state.lineWeight} dashArray={this.state.dashes} positions={this.props.prevLocation} >
                    <Popup autoPan={false} className="popupStyle">
                        Distance: {this.props.polyDistance} M
                    </Popup>
                </Polyline>
            </div>
        );
    }

    togglePolyline(){
        this.setState({togglePolyline: !this.state.togglePolyline})
    }

    toggleMarker(){
        this.setState({toggleMarker: !this.state.toggleMarker})
    }
}
