import React, {Component} from 'react';
import {Col, Container, Row, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import homeIcon from '../../static/images/homeButtonIcon.png';
import homeMarker from '../../static/images/youAreHereMarker.png';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import {helperRenderFunction, helperSetCurrentSearchBar, calculateDistance} from "./HelperFunctions"

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

const dropdownStyle = {
  position: "absolute",
  left: 10,
  top: 100,
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderColor: "rgba(0,0,0,1)",
  padding: "none",
  cursor: "pointer",
  outline: "none",
  zIndex: 1010,
}

const distanceButtonStyle = {
  position: "absolute",
  top: 11,
  left: -1,
  zIndex: 1005,
  height: 32,
  fontSize: 12,
  backgroundColor: "#1E4D2B",
}

export default class Atlas extends Component {
  constructor(props) {
    super(props);
    this.geoPosition();
    this.setMarker = this.setMarker.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      markerPosition: null,
      searchTextTo: "",
      searchTextFrom: "",
      searchBarText: "",
      homeLocation: homeCoords,
      showDistanceSearch: false,
      showLocationSearch: false,
      buttonDropdown: false,
      prevLocation: [[0,0],[0,0]],
    };
  }

  handleInputChange = () => {
    const target = event.target;
    if(target.name === "searchBarTo"){
      this.setState({searchTextTo: target.value});
    }
    if(target.name === "searchBarFrom"){
      this.setState({searchTextFrom: target.value});
    }
    if(target.name === "searchBar"){
      this.setState({searchBarText: target.value});
    }
  }

  render() {
    return (
        <div><Container><Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                {this.renderLeafletMap()}
              </Col>
            </Row></Container></div>
    );
  }

  renderLeafletMap() {
    return (
        <div id="container">
          {this.renderOverlayDiv()}
          {this.addDropdownButton()}
          {this.setCurrentSearchBar()}
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

  setCurrentSearchBar(){
    let searchField = [{info: this.state.showDistanceSearch, extra: this.renderSearchField()}, {info: this.state.showLocationSearch, extra: this.renderSearchBar()}]
    return( <div>{searchField.map(helperSetCurrentSearchBar)}</div> );
  }

  addDropdownButton(){
    return(
        <div style={{position: "absolute"}}>
          <ButtonDropdown  isOpen={this.state.buttonDropdown} onClick={() => this.toggleButtonDropdown()}>
            <DropdownToggle caret style={dropdownStyle}>Search</DropdownToggle>
            <DropdownMenu>
              <DropdownItem><div onClick={() => this.toggleSearchDistance()}> Distance </div></DropdownItem>
              <DropdownItem><div onClick={() => this.toggleSearchLocation()}> Location </div></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
    );
  }

  toggleSearchDistance(){ this.setState({showDistanceSearch: !this.state.showDistanceSearch}); }
  toggleSearchLocation(){ this.setState({showLocationSearch: !this.state.showLocationSearch}); }
  toggleButtonDropdown(){ this.setState({buttonDropdown: !this.state.buttonDropdown}); }

  renderOverlayDiv(){
    return(
        <div id="overlayDiv"><button className="home-btn" style={{top: 70}} onClick={() => this.setState({markerPosition: null})}>
            <span><img src={homeIcon} style={homeButtonStyle} title="Go Home" alt = "Home"/></span>
          </button></div> );
  }

  renderSearchField(){
    let helpSearchField = [{name: "searchBarFrom", place: "From", classname: "inputFieldSearchField", style: inputFieldStyleFrom, color: "primary", change: this.handleInputChange}]
    return(
        <div><Row xs="3">
            <Col>{helpSearchField.map(helperRenderFunction)}</Col>
            <Col>{this.renderSearchFieldTo()}</Col>
            <Col>{this.renderCalculateButton()}</Col>
          </Row></div> );
  }

  renderSearchBar(){
    let searchbar = [{name: "searchBar", place: "Search Location", classname: "inputFieldSearchBar", style: inputFieldStyleSearchBar, color: "primary", change: this.handleInputChange}]
    return( <div>{searchbar.map(helperRenderFunction)}</div> );
  }

  renderSearchFieldTo(){
    return ( <Input name="searchBarTo" placeholder="To" className="inputFieldSearchField" style={inputFieldStyleFrom} color="primary" onChange={this.handleInputChange}/> );
  }

  renderCalculateButton = () => {
    return( <div><Button className="p-1" style={distanceButtonStyle} onClick={() => calculateDistance}> Calculate </Button></div> )
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
    if (this.state.homeLocation){ return( <Marker ref={initMarker} position={this.state.homeLocation} icon={HOME_MARKER}/> ) }
  }

  getMarker() {
    const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
    if (this.state.markerPosition) {
      return (
          <Marker ref={initMarker} position={this.state.markerPosition} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
          </Marker> ) }
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