import React, {Component} from 'react';
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

const homeButtonStyle = {
  top: 5,
  left: 1,
  width: 15,
  position: "absolute",
}

export default class Atlas extends Component {
  constructor(props) {
    super(props);
    this.geoPosition();
    this.setMarker = this.setMarker.bind(this);
    this.state = {
      markerPosition: null,
      homeLocation: homeCoords,
      buttonDropdown: false,
      prevLocation: [[0,0],[0,0]],
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <HelperFunctions/>
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
              zoom={15}
              minZoom={MAP_MIN_ZOOM}
              maxZoom={MAP_MAX_ZOOM}
              maxBounds={MAP_BOUNDS}
              center={this.getArrayMarkerLocation()}
              onClick={this.setMarker}
              id="theMap" >
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
            {this.getHomeMarker()}
            {this.getMarker()}
          </Map>
        </div>
    );
  }

  renderOverlayDiv(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" style={{top: 70}} onClick={() => this.setState({markerPosition: null})}>
            <span><img src={homeIcon} style={homeButtonStyle} title="Go Home" alt = "Home"/></span>
          </button>
        </div> );
  }

  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            myCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
            homeCoords = [position.coords.latitude, position.coords.longitude];
            this.setState({homeLocation: homeCoords});
          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
    const newIds = this.state.prevLocation.slice();
    if(index === 1){
      newIds[1] = mapClickInfo.latlng;
      this.setState({prevLocation: newIds})
      index -= 1;
    } else {
      newIds[0] = mapClickInfo.latlng;
      this.setState({prevLocation: newIds})
      index += 1;
    }
    console.log(this.state.prevLocation);
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
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    if (this.state.markerPosition) {
      return (
          <Marker ref={initMarker} position={this.state.markerPosition} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
          </Marker> )
    }
  }

  getStringMarkerPosition() {
    if(this.state.markerPosition) { return +this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2); }
    if(!this.state.markerPosition) { return MAP_CENTER_DEFAULT; }
  }

  getArrayMarkerLocation() {
    let latLngArray = [0.0,0.0]
    if(this.state.markerPosition) {
      latLngArray[0] = parseFloat(this.state.markerPosition.lat);
      latLngArray[1] = parseFloat(this.state.markerPosition.lng);
      return latLngArray;
    }
    latLngArray[0] = parseFloat(myCoords.lat);
    latLngArray[1] = parseFloat(myCoords.lng);
    return latLngArray;
  }
}

let myCoords = L.latLng(40.5734,-105.0865);
let homeCoords;
let index = 0;

function error(err) { console.warn(`ERROR(${err.code}): ${err.message}`); }