import React, {Component} from 'react';
import {Col, Container, Row, Input} from 'reactstrap';

import homeIcon from '../../static/images/homeButtonIcon.png';
import homeMarker from '../../static/images/youAreHereMarker.png';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

const inputFieldStyleFrom = {
  zIndex: 1002,
  height: 34,
  top: 10,
  left: 70,
  position: "absolute",
}

const inputFieldStyleTo = {
  zIndex: 1002,
  height: 34,
  top: 10,
  left: 40,
  position: "absolute",
}

const inputFieldStyleSearchBar = {
  zIndex: 1002,
  height: 34,
  bottom: 10,
  left: 50,
  position: "absolute",
}

const homeButtonStyle = {
  top: 5,
  left: 1,
  width: 15,
  position: "absolute",
}

let toSearchField = [{hold: "To", cN: "inputFieldSearchField", st: inputFieldStyleTo}]
let searchbar = [{hold: "Search Location", cN: "inputFieldSearchBar", st: inputFieldStyleSearchBar}]

export default class Atlas extends Component {

  constructor(props) {
    super(props);
    this.geoPosition();
    this.setMarker = this.setMarker.bind(this);

    this.state = {
      markerPosition: null,
      searchText: "",
      homeLocation: homeCoords,
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
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
          {this.renderSearchFieldFrom()}
          {this.renderSearchBar()}
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
              id="theMap"
          >
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
            {this.getHomeMarker()}
            {this.getMarker()}
          </Map>
        </div>
    );
  }

  renderSearchFieldFrom(){
    return(
        <div>
          <Row xs="3">
            <Col>
              <Input placeholder="From" className="inputFieldSearchField" style={inputFieldStyleFrom} color="primary"/>
            </Col >
            <Col>
              {this.renderSearchFieldTo()}
            </Col>
          </Row>
        </div>
    );
  }

  renderSearchFieldTo(){
    return (
        <div>
          {toSearchField.map(this.getSearchField)}
        </div>
    );
  }

  renderSearchBar(){
    return(
        <div>
          {searchbar.map(this.getSearchField)}
        </div>
    );
  }

  getSearchField(field) {
    return (
        <div>
          <Input placeholder={field.hold} className={field.cN} style={field.st} color="primary" />
        </div>
    )
  }

  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            myCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
            homeCoords = [position.coords.latitude, position.coords.longitude];
            //this.setMarker({latlng: myCoords});
            this.setState({homeLocation: homeCoords});

          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  renderOverlayDiv(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" onClick={() => this.setState({markerPosition: null})}>
            <span>
              <img src={homeIcon} style={homeButtonStyle} alt="Go Home"/>
            </span>
          </button>
        </div>
    );
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
  }

  getHomeMarker(){
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };

    if (this.state.homeLocation){
      return(
          <Marker ref={initMarker} position={this.state.homeLocation} icon={HOME_MARKER}/>
      )
    }
  }

  getMarker() {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };


    if (this.state.markerPosition) {
      return (
          <Marker ref={initMarker} position={this.state.markerPosition} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
          </Marker>
      )
    }
  }

  getStringMarkerPosition() {
    if(this.state.markerPosition)
    {
      return +this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
    }
    if(!this.state.markerPosition)
    {
      return MAP_CENTER_DEFAULT;
    }
  }

  getArrayMarkerLocation() {
    let latLngArray = [0.0,0.0]
    if(this.state.markerPosition)
    {
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

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
