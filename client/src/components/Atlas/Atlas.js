import  React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import homeIcon from '../../static/images/homeButtonIcon.png';
import homeMarker from '../../static/images/youAreHereMarker.png';
import {Map, Marker, TileLayer, Polyline, Popup} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

import HelperFunctions from "./HelperFunctions";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const HOME_BUTTON_STYLE = {
  top: 5,
  left: 1,
  width: 15,
  position: "absolute",
}

let zoomLevel = 15;

export default class Atlas extends Component {
  constructor(props) {
    super(props);
    this.geoPosition();
    this.setMarker = this.setMarker.bind(this);
    this.getLastCoordinates = this.getLastCoordinates.bind(this);
    this.getLastCoordinatesPart2 = this.getLastCoordinatesPart2.bind(this);
    this.setSearchBarCords = this.setSearchBarCords.bind(this);
    this.setPrevLocationState = this.setPrevLocationState.bind(this);
    this.getMarkerPosition = this.getMarkerPosition.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.setDistanceState = this.setDistanceState.bind(this);
    this.setSearchTextIsEmpty = this.setSearchTextIsEmpty.bind(this);
    this.child = React.createRef();

    this.state = {
      markerPosition: null,
      homeLocation: homeCoords,
      prevLocation: [null,null],
      mapCenter: MAP_CENTER_DEFAULT,
      whereIsMarker: null,
      searchResults: [],
      polyDistance: [0,0],
      searchTextToIsEmpty: true,
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <HelperFunctions sendFunction={this.getLastCoordinates()} sendFunctionPart2={this.getLastCoordinatesPart2()}
                                 setLatLngCoords={this.setSearchBarCords} setPrevLocationState={this.setPrevLocationState}
                                 getMarkerPosition={this.getMarkerPosition} setSearchResults={this.setSearchResults} setDistanceState={this.setDistanceState}
                                 ref={this.child} comment={this.state.polyDistance} setSearchTextIsEmpty={this.setSearchTextIsEmpty}/>
                {this.renderLeafletMap()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderLeafletMap() {
    return (
        <div id="container">
          {this.renderOverlayDiv()}
          <Map
              className={'mapStyle'}
              boxZoom={false}
              useFlyTo={true}
              zoom={zoomLevel}
              minZoom={MAP_MIN_ZOOM}
              maxZoom={MAP_MAX_ZOOM}
              maxBounds={MAP_BOUNDS}
              center={this.state.mapCenter}
              onClick={this.setMarker}
              id="theMap"
              viewport = {{}}>
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
            {this.getHomeMarker()}
            {this.getMarker()}
            {this.getMapZoom()}
            {this.makePolyline()}
            {this.state.whereIsMarker && this.renderWhereIsMarker()}
          </Map>
        </div>
    );
  }
  setSearchTextIsEmpty(_state){
    this.setState({searchTextFromIsEmpty: _state})
  }

  setSearchResults(_state){
    this.setState({searchResults: _state})
  }

  setDistanceState(distanceState){
    this.setState({polyDistance: distanceState});
  }

  renderWhereIsMarker(){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    return (
        <Marker ref={initMarker} position={this.state.whereIsMarker} icon={MARKER_ICON}/>
    );
  }

  setSearchBarCords (coords)  {
    try {
      let cordParse = require('coordinate-parser')
      let cordLocation = new cordParse(coords);
      this.setState({mapCenter: [cordLocation.getLatitude(), cordLocation.getLongitude()], markerPosition: null, whereIsMarker: L.latLng(cordLocation.getLatitude(), cordLocation.getLongitude())});
    } catch (error) {
      alert("Invalid Coordinate Input!")
    }
  }

  makePolyline(){
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    }
    if(this.state.prevLocation[1] !== null && this.state.prevLocation[0] !== null) {
      return (
          <div>
            <Polyline ref={initMarker} color="green" positions={this.state.prevLocation} >
              <Popup autoPan={false} className="popupStyle">
                ({this.state.prevLocation[0].lat.toFixed(1).toString()},{this.state.prevLocation[0].lng.toFixed(1).toString()}),
                ({this.state.prevLocation[1].lat.toFixed(1).toString()},{this.state.prevLocation[1].lng.toFixed(1).toString()})]<br/>
                Distance: {this.state.polyDistance} Miles
              </Popup>
            </Polyline>
          </div>
      );
    }
  }
  setPrevLocationState(markerArray){
    let parseArr = [markerArray[0].lat.toString(), markerArray[0].lng.toString()]
    this.setState({prevLocation: markerArray, mapCenter: parseArr});
  }

  getMapZoom(){
    zoomLevel = this.map && this.map.leafletElement.getZoom();
  }

  renderOverlayDiv(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" style={{top: 70}} onClick={() => this.homeButtonSetStateVars()}>
            <span><img src={homeIcon} style={HOME_BUTTON_STYLE} title="Go Home" alt = "Home"/></span>
          </button>
        </div> );
  }

  homeButtonSetStateVars() {
    this.setState({markerPosition: null, prevLocation: [null,null], mapCenter: this.state.homeLocation, whereIsMarker: null});
  }

  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            homeCoords = [position.coords.latitude, position.coords.longitude];
            this.setState({homeLocation: homeCoords, mapCenter: [position.coords.latitude, position.coords.longitude]});
          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setMarker(mapClickInfo) {
    const newIds = this.state.prevLocation.slice();
    newIds[1] = newIds[0];
    newIds[0] = mapClickInfo.latlng;
    if(!this.state.searchTextFromIsEmpty && this.state.prevLocation[0] !== null && this.state.prevLocation[1] !== null){
      this.setState({prevLocation: newIds, markerPosition: mapClickInfo.latlng, mapCenter: [this.state.prevLocation[0].lat.toString(),this.state.prevLocation[0].lng.toString()]})
    } else {
      this.setState({prevLocation: newIds, markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng})
    }
    return(
        <div>
          execute=(comment)=>{this.child.current.calcDist()}
        </div>
    );
  }


  getHomeMarker(){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    if (this.state.homeLocation){
      return (
          <Marker ref={initMarker} position={this.state.homeLocation} icon={HOME_MARKER}/>
      )
    }
  }

  getMarker() {
    let markerArray = [];
    for (let i = 0; i < 2; ++i) {
      if (this.state.prevLocation[i] !== null) { markerArray.push(this.addAMarker(i)); }
    }
    return ( <div>{markerArray.map((element, index) => (<div key={index}>{element}</div>))} </div>);
  }

  addAMarker(markerType){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    let positionMarker = MAP_CENTER_DEFAULT;
    if(markerType === 0 || markerType === 1){ positionMarker = this.state.prevLocation[markerType]}
    return(
        <div>
          <Marker key={markerType} ref={initMarker} position={positionMarker} icon={MARKER_ICON}/>
        </div>
    );
  }

  addWhereIsMarker(coords){
    console.log([coords.lat.toString(), coords.lng.toString()])
    this.setState({whereIsMarker: coords, markerPosition: coords, mapCenter: [coords.lat.toString(), coords.lng.toString()]});
  }

  getLastCoordinates() {
    return this.state.prevLocation[0];
  }

  getLastCoordinatesPart2() {
    return this.state.prevLocation[1];
  }

  getMarkerPosition(){
    return this.state.markerPosition;
  }
}

let homeCoords;
function error(err) { console.warn(`ERROR(${err.code}): ${err.message}`); }
