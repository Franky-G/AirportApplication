import  React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import homeIcon from '../../static/images/homeButtonIcon.png';
import homeMarker from '../../static/images/youAreHereMarker.png';
import {Map, Marker, TileLayer, Polyline, Popup} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import SearchModule from "./SearchModule";

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

let homeCoords;
function error(err) { console.warn(`ERROR(${err.code}): ${err.message}`); }

export default class Atlas extends Component {

  constructor(props) {
    super(props);
    this.geoPosition();
    this.setMarker = this.setMarker.bind(this);
    this.setSearchBarCoords = this.setSearchBarCoords.bind(this);
    this.setPrevLocationState = this.setPrevLocationState.bind(this);
    this.setSearchTextIsEmpty = this.setSearchTextIsEmpty.bind(this);
    this.setWhereIsMarker = this.setWhereIsMarker.bind(this);

    this.state = {
      markerPosition: null,
      homeLocation: homeCoords,
      prevLocation: [null,null],
      mapCenter: MAP_CENTER_DEFAULT,
      whereIsMarker: null,
      polyDistance: [0,0],
      searchTextToIsEmpty: true,
      hasUserLocation: null
    };
  }

  render() {
    return (
        <div>
          {console.log("render")}
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <SearchModule
                    {...this.state}
                    setSearchBarCoords={this.setSearchBarCoords} setPrevLocationState={this.setPrevLocationState}
                    ref={(ref) => this.searchREF=ref} setSearchTextIsEmpty={this.setSearchTextIsEmpty}
                    setWhereIsMarker={this.setWhereIsMarker}/>
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
          {this.renderHomeButton()}
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

  checkPrevArray(){
    if(this.state.prevLocation[1] !== null){
      return (
          <div>
            {this.searchREF.calcDist()}
          </div>
      );
    }
  }


  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            this.setState({homeLocation: [position.coords.latitude, position.coords.longitude], mapCenter: [position.coords.latitude, position.coords.longitude], hasUserLocation: true});
          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getHomeMarker(){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    if (this.state.homeLocation){
      return (
          <Marker ref={initMarker} position={this.state.homeLocation} icon={HOME_MARKER}/>
      )
    }
  }

  getMapZoom(){
    zoomLevel = this.map && this.map.leafletElement.getZoom();
  }

  getMarker() {
    let markerSet = [];
    for (let i = 0; i < 2; ++i) {
      if (this.state.prevLocation[i] !== null) { markerSet.push(this.addAMarker(i)); }
    }
    return ( <div>{markerSet.map((element, index) => (<div key={index}>{element}</div>))} </div> );
  }

  homeButtonSetStateVars() {
    if(this.state.hasUserLocation) { this.setState({markerPosition: null, prevLocation: [null,null], mapCenter: this.state.homeLocation, whereIsMarker: null}); }
    else{ this.setState( {markerPosition: null, prevLocation: [null,null], mapCenter: MAP_CENTER_DEFAULT, whereIsMarker: null}); }
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
                Distance: {this.state.polyDistance}
              </Popup>
            </Polyline>
          </div>
      );
    }
  }

  renderHomeButton(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" style={{top: 70}} onClick={() => this.homeButtonSetStateVars()}>
            <span><img src={homeIcon} style={HOME_BUTTON_STYLE} title="Go Home" alt = "Home"/></span>
          </button>
        </div> );
  }

  renderWhereIsMarker(){
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    return (
        <Marker ref={initMarker} position={this.state.whereIsMarker} icon={MARKER_ICON}/>
    );
  }

  setMarker(mapClickInfo) {
    const slicedArray = this.state.prevLocation.slice();
    slicedArray[1] = slicedArray[0];
    slicedArray[0] = mapClickInfo.latlng;
    if(!this.state.searchTextToIsEmpty && this.state.prevLocation[0] !== null && this.state.prevLocation[1] !== null){
      this.setState({prevLocation: slicedArray, markerPosition: mapClickInfo.latlng, mapCenter: [this.state.prevLocation[0].lat.toString(),this.state.prevLocation[0].lng.toString()]})
    } else {
      this.setState({prevLocation: slicedArray, markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng})
    }
    return(
        this.checkPrevArray()
    );
  }

  setPrevLocationState(markerArray, distanceVal){
    let parseArr = [markerArray[0].lat.toString(), markerArray[0].lng.toString()]
    this.setState({prevLocation: markerArray, mapCenter: parseArr, polyDistance: distanceVal});
  }

  setSearchBarCoords (coords)  {
    try {
      let cordParse = require('coordinate-parser');
      let cordLocation = new cordParse(coords);
      this.setState({mapCenter: [cordLocation.getLatitude(), cordLocation.getLongitude()], markerPosition: null, whereIsMarker: L.latLng(cordLocation.getLatitude(), cordLocation.getLongitude())});
    } catch (error) {
      alert("Invalid Coordinate Input!")
    }
  }

  setSearchTextIsEmpty(_state){
    this.setState({searchTextToIsEmpty: _state})
  }

  setWhereIsMarker(_pos){
    this.setState({whereIsMarker: _pos, mapCenter: [_pos.lat, _pos.lng]})
  }
}


