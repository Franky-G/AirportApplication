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
    this.getLastCoordinates = this.getLastCoordinates.bind(this)
    this.getLastCoordinatesPart2 = this.getLastCoordinatesPart2.bind(this)
    this.setSearchBarCords = this.setSearchBarCords.bind(this);
    this.state = {
      markerPosition: null,
      homeLocation: homeCoords,
      buttonDropdown: false,
      prevLocation: [[0,0],[0,0]],
      mapCenter: MAP_CENTER_DEFAULT
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <HelperFunctions sendFunction={this.getLastCoordinates()} sendFunctionPart2={this.getLastCoordinatesPart2()}/>
                <HelperFunctions setLatLngCoords={this.setSearchBarCords}/>
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
            {/*{<Polyline positions={this.state.prevLocation} color={'green'}/>}*/}
            {this.getMapZoom()}
          </Map>
        </div>
    );
  }

  setSearchBarCords (coords)  {
    this.setState({mapCenter: coords});
    this.setState({markerPosition: null});
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
    this.setState({markerPosition: null});
    this.setState({mapCenter: this.state.homeLocation});
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
    this.setState({markerPosition: mapClickInfo.latlng});
    this.setState({mapCenter: mapClickInfo.latlng})
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

  getLastCoordinates() {
    return this.state.prevLocation[0];
  }

  getLastCoordinatesPart2() {
    return this.state.prevLocation[1];
  }

}

let homeCoords;
let index = 0;

function error(err) { console.warn(`ERROR(${err.code}): ${err.message}`); }