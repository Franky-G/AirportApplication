import  React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import homeIcon from '../../static/images/homeButtonIcon.png';
import homeMarker from '../../static/images/youAreHereMarker.png';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
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
    this.state = {
      markerPosition: null,
      homeLocation: homeCoords,
      prevLocation: [null,null],
      mapCenter: MAP_CENTER_DEFAULT,
      whereIsMarker: null,
      searchResults: [],
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
                                 getMarkerPosition={this.getMarkerPosition} setSearchResults={this.setSearchResults}/>
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

  setSearchResults(_state){
    console.log(_state);
    this.setState({searchResults: _state})
  }

  renderWhereIsMarker(){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    return (
        <Marker ref={initMarker} position={this.state.whereIsMarker} icon={MARKER_ICON}/>
    );
  }

  setSearchBarCords (coords)  {
    let latLngCords = coords.split(',');
    latLngCords[0] = parseFloat(latLngCords[0]);
    latLngCords[1] = parseFloat(latLngCords[1]);
    this.setState({mapCenter: latLngCords, markerPosition: null, whereIsMarker: L.latLng(latLngCords[0], latLngCords[1])});
  }

  makePolyline(){
    if(this.state.prevLocation[1] !== null && this.state.prevLocation[0] !== null) {
      return (
          <Polyline color="green" positions={this.state.prevLocation}/>
      );
    }
  }

  setPrevLocationState(markerArray){
    this.setState({prevLocation: markerArray});
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
            this.setState({mapCenter: [position.coords.latitude, position.coords.longitude]})
            homeCoords = [position.coords.latitude, position.coords.longitude];
            this.setState({homeLocation: homeCoords});
          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng});
    const newIds = this.state.prevLocation.slice();
    newIds[1] = newIds[0];
    newIds[0] = mapClickInfo.latlng;
    this.setState({prevLocation: newIds})
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
    let currentMarkerString = this.getStringMarkerPosition();
    let positionMarker = MAP_CENTER_DEFAULT;
    if(markerType === 0 || markerType === 1){ positionMarker = this.state.prevLocation[markerType]; currentMarkerString = this.popupCoordsString(markerType)}
    return(
        <div>
          <Marker key={markerType} ref={initMarker} position={positionMarker} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{currentMarkerString}</Popup>
          </Marker>
        </div>
    );
  }

  addWhereIsMarker(coords){
    this.setState({whereIsMarker: coords});
  }

  popupCoordsString(markerType){
    if(markerType !== 0 || markerType !== 1){
      return MAP_CENTER_DEFAULT;
    } else {
      return ("the latlng: " + this.state.prevLocation[markerType].lat.toString().toFixed(5) + ',' + this.state.prevLocation[markerType].lng.toString().toFixed(5));
    }
  }

  getStringMarkerPosition() {
    if(this.state.markerPosition) { return +this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2); }
    if(!this.state.markerPosition) { return MAP_CENTER_DEFAULT; }
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
