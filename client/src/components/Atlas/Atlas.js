import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';



const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarker = this.setMarker.bind(this);
    this.geoPosition();

    this.state = {
      markerPosition: null,
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
        <div>

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
            <div id="button-wrapper">
              <button id="btn" onClick={() => this.setUserLocation()}><img src="https://www.pinclipart.com/picdir/big/44-448226_file-home-icon-svg-wikimedia-commons-free-train.png" height="auto" width="100%"/></button>
            </div>
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
            {this.getMarker()}
          </Map>
        </div>
    );
  }

  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy:true});
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
    var latLngArray = [0.0,0.0]
    if(this.state.markerPosition)
    {
      latLngArray[0] = parseFloat(this.state.markerPosition.lat);
      latLngArray[1] = parseFloat(this.state.markerPosition.lng);
      return latLngArray;
    }
    return MAP_CENTER_DEFAULT;
  }
}

function success(position) {
  myCoords = L.latLng(position.coords.latitude, position.coords.longitude);
}

let myCoords = L.latLng(40.5734,-105.0865);

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
var yourImg = document.getElementById('yourImgId');
if(yourImg && yourImg.style) {
  yourImg.style.height = '30px';
  yourImg.style.width = '30px';
}