import React, {Component} from 'react';
import {Col, Container, Row, Input} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const HOME = "\u2302";

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

let toSearchField = [{hold: "To", cN: "inputFieldSearchField", st: inputFieldStyleTo}]
let searchbar = [{hold: "Search Location", cN: "inputFieldSearchBar", st: inputFieldStyleSearchBar}]

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarker = this.setMarker.bind(this);
    this.geoPosition();

    this.state = {
      markerPosition: null,
      searchText: "",
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
              viewport={{}}
              id="theMap"
          >
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
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

  renderOverlayDiv(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" onClick={() => this.setUserLocation()}>
            <span>
              <p className="homeImg">{HOME}</p>
            </span>
          </button>
        </div>
    );
  }



  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            myCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
            this.setMarker({latlng: myCoords});
          }
          , error, {enableHighAccuracy:true});

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setUserLocation(){
    this.setState({markerPosition: myCoords});
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
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
      );
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
    return MAP_CENTER_DEFAULT;
  }
}

let myCoords = L.latLng(40.5734,-105.0865);

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
