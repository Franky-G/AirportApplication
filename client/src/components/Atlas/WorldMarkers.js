import React, {Component} from "react";
import {Marker, Polyline, Popup} from "react-leaflet";
import homeMarker from "../../static/images/youAreHereMarker.png";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Modal, ModalBody, ModalHeader, Label, Input} from "reactstrap";
import Slider from '@material-ui/core/Slider';

const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});
const lineArray = [{state: "", label: "Solid"}, {state: "7 8", label: "Dashed"}, {state: "24 10 8 10", label: "Dotted"}]

export default class WorldMarkers extends Component {

    constructor(props) {
        super(props);
        this.setModalRef = this.setModalRef.bind(this);
        this.openPolylineOptions = this.openPolylineOptions.bind(this);
        this.state = {
            marker: icon, lineType: null, lineColor: "green", lineWeight: 3, polyOpen: false, dashes: "",
        }
    }

    render(){
        return(
            <div>
                {this.getHomeMarker()}
                {this.getMarker()}
                {this.changePolyline()}
                {this.props.whereIsMarker && this.renderWhereIsMarker()}
                {this.makePolyline()}
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
    }

    setModalRef(node) {
        this.modalRef = node;
    }

    addAMarker(markerType){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        let positionMarker = MAP_CENTER_DEFAULT;
        if(markerType === 0 || markerType === 1){ positionMarker = this.props.prevLocation[markerType]}
        return(
            <div>
                <Marker key={markerType} ref={initMarker} position={positionMarker} icon={MARKER_ICON}/>
            </div>
        );
    }

    changeMarker(icon){

    }

    changePolyline(){
        return(
            <div ref={this.setModalRef} tabIndex="0">
                <Modal isOpen={this.state.polyOpen} toggle={this.openPolylineOptions}>
                    <ModalHeader toggle={() => this.openPolylineOptions()}><b>Change Polyline Options</b></ModalHeader>
                    <ModalBody>
                        <p className="vertical-center">Line Width: {this.state.lineWeight} <span style={{width: 30}}/>
                            <Slider style={{width:300}} value={this.state.lineWeight} max={10} min={1} step={1} onChange={(event,value) => {this.checkSlider(value)}}/>
                        </p>
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

    colorSpacer(){
        return(
            <div className="px-3"/>
        );
    }

    checkSlider(value){
        if(this.props.atlasTripPlaces[1] === "" || this.props.prevLocation[1] === null){
            return(
                alert("Add 2 points first!")
            );
        } else {
            this.sliderChange(value)
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
        return ( <div>{markerSet.map((element, index) => (<div key={index}>{element}</div>))} </div> );
    }

    sliderChange(value){
        this.setState({lineWeight: value});
    }

    openPolylineOptions(){
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
            return (
                this.renderPolyline(array)
            );
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
}
