import  React, {Component} from 'react';
import {Col, Container, Row, DropdownItem, DropdownMenu, ButtonDropdown, DropdownToggle, Badge} from 'reactstrap';
import homeIcon from '../../static/images/homeButtonIcon.png';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import SearchModule from "./SearchModule";
import Trip from "../Trip/Trip"
import WorldMarkers from "./WorldMarkers";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
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
    this.setTripRecord = this.setTripRecord.bind(this);
    this.tripClicked = this.tripClicked.bind(this);
    this.setTripPlaces = this.setTripPlaces.bind(this);

    this.state = {
      markerPosition: null,
      homeLocation: MAP_CENTER_DEFAULT,
      prevLocation: [null,null],
      mapCenter: MAP_CENTER_DEFAULT,
      whereIsMarker: null,
      polyDistance: [0,0],
      searchTextToIsEmpty: true,
      hasUserLocation: null,
      tripRecord: false,
      dropdownOpen: false,
      recordingTrip: 0,
      tripStyle: "",
      atlasTripPlaces: [],
    };
  }

  render() {
    return (
        <div style={{position: "relative"}}>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <SearchModule
                    {...this.state} setSearchBarCoords={this.setSearchBarCoords}
                    setPrevLocationState={this.setPrevLocationState} ref={(ref) => this.searchREF=ref}
                    setSearchTextIsEmpty={this.setSearchTextIsEmpty} setWhereIsMarker={this.setWhereIsMarker}/>
                <Trip {...this.state} ref={(ref) => this.tripREF=ref} setWhereIsMarker={this.setWhereIsMarker}
                      setTripRecord={this.setTripRecord} tripClicked={this.tripClicked} setTripPlaces={this.setTripPlaces}/>
                {this.renderLeafletMap() }
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
          {this.renderTripButton()}
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
            <WorldMarkers {...this.state}/>
            {this.getMapZoom()}
          </Map>
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

  setTripPlaces(array){
    if (!array.includes(null)) {
        this.setState({atlasTripPlaces: array})
    }
  }

  geoPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            this.setState({homeLocation: [position.coords.latitude, position.coords.longitude],
              mapCenter: [position.coords.latitude, position.coords.longitude], hasUserLocation: true});
          }
          , error, {enableHighAccuracy:true});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getMapZoom(){
    zoomLevel = this.map && this.map.leafletElement.getZoom();
  }

  homeButtonSetStateVars() {
    if(this.state.hasUserLocation) {
      this.helperHomeButton()
      this.setState({markerPosition: null, prevLocation: [null,null], mapCenter: this.state.homeLocation, whereIsMarker: null});
    }
    else{
      this.helperHomeButton()
      this.setState( {markerPosition: null, prevLocation: [null,null], mapCenter: MAP_CENTER_DEFAULT, whereIsMarker: null});
    }
  }

  helperHomeButton() {
    if(this.state.tripRecord) {
      this.tripREF.addPlace(L.latLng(this.state.homeLocation[0], this.state.homeLocation[1]), this.tripREF.returnPlacesSize(), "Home");
    }
  }

  openTrip(){
    return(
        <div>
          {this.tripREF.closeTripUI()}
        </div>
    );
  }

  renderHomeButton(){
    return(
        <div id="overlayDiv">
          <button className="home-btn" style={{top: 71}} onClick={() => this.homeButtonSetStateVars()}>
            <span><img src={homeIcon} style={HOME_BUTTON_STYLE} title="Go Home" alt = "Home"/></span>
          </button>
        </div> );
  }

  renderTripButton(){
    return(
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => this.setDropdown()}
                        style={{position: "absolute", top: 164, zIndex: 1018, padding: 0, margin: 0, fontSize: 9, outline: 0}}>
          <DropdownToggle id="tripRecording" className={this.state.tripStyle} caret size="sm"
                          style={{borderLeft: "2px solid rgba(0,0,0,0.3)", borderRight: "2px solid rgba(0,0,0,0.3)",
            borderBottom: "2px solid rgba(0,0,0,0.3)", borderTop: "1px solid rgba(0,0,0,0.2)", borderRadius: "0 0 4px 4px", outline: 0}}>
            T
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.tripREF.closeTripUI()}>Open Trip Designer</DropdownItem>
            <DropdownItem onClick={() => this.setTripRecord()}> Toggle Trip Recording
              <Badge style={{borderRadius: 30}} color={this.tripClicked()}>R</Badge></DropdownItem>
            <DropdownItem onClick={() => this.tripREF.resetTripPlaces()}>Reset</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
    );
  }

  setMarker(mapClickInfo) {
    const slicedArray = this.state.prevLocation.slice();
    slicedArray[1] = slicedArray[0];
    slicedArray[0] = mapClickInfo.latlng;
    if(!this.state.searchTextToIsEmpty && this.state.prevLocation[0] !== null && this.state.prevLocation[1] !== null){
      this.setState({prevLocation: slicedArray, markerPosition: mapClickInfo.latlng,
        mapCenter: [this.state.prevLocation[0].lat.toString(),this.state.prevLocation[0].lng.toString()]})
    } else {
      this.setState({prevLocation: slicedArray, markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng})
    }
    if(this.state.tripRecord === true){
      let note = mapClickInfo.latlng.lat.toFixed(3) + ", " + mapClickInfo.latlng.lng.toFixed(3)
      this.tripREF.addPlace(mapClickInfo.latlng, this.tripREF.returnPlacesSize(), note);
      this.forceUpdate()
    }
    return(
        this.checkPrevArray()
    );
  }

  setDropdown(){
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  setPrevLocationState(markerArray, distanceVal){
    let parseArr = [markerArray[0].lat.toString(), markerArray[0].lng.toString()]
    this.setState({prevLocation: markerArray, mapCenter: parseArr, polyDistance: distanceVal});
  }

  setTripRecord(){
    if(this.state.recordingTrip === 0) {
      this.setState({recordingTrip: 1, tripRecord: !this.state.tripRecord})
    } else {
      this.setState({recordingTrip: 0, tripRecord: !this.state.tripRecord})
    }
  }

  setSearchBarCoords (coords)  {
    try {
      let cordParse = require('coordinate-parser')
      let cordLocation = new cordParse(coords);
      this.setState({mapCenter: [cordLocation.getLatitude(), cordLocation.getLongitude()], markerPosition: null,
        whereIsMarker: L.latLng(cordLocation.getLatitude(), cordLocation.getLongitude())});
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

  tripClicked() {
    if (this.state.recordingTrip === 1) {
      return "success"
    } else {
      return "danger"
    }
  }
}


