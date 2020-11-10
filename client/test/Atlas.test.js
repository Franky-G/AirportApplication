import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Atlas from '../src/components/Atlas/Atlas';

const startProperties = {
  createSnackBar: jest.fn()
};

function testInitialAtlasState() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}

test("Testing Atlas's Initial State", testInitialAtlasState);


function testMarkerIsRenderedOnClick() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

  let latlng = {lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().markerPosition).toEqual(latlng);
  // expect(atlas.find('Marker')).toEqual(1); ??
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);


function testTripClicked() {
  const clicked = shallow(<Atlas/>)
  expect(clicked.state().recordingTrip).toEqual(0)
  clicked.instance().tripClicked()
  expect(clicked.state().recordingTrip).toEqual(0)
}

test("Trip clicked", testTripClicked)

function testTripRecord() {
  const record = shallow(<Atlas/>)
  record.instance().setTripRecord()
}

test("Trip Record", testTripRecord)

function testDropDown() {
  const down = shallow(<Atlas/>)
  down.instance().setDropdown()
}

test("Set Drop Down", testDropDown)

function testTripButton() {
  const button = shallow(<Atlas/>)
  button.instance().renderTripButton()
}

test("Render Trip Button", testTripButton)

function testHomeButton() {
  const home = shallow(<Atlas/>)
  home.instance().renderHomeButton()
}

test("Render Home Button", testHomeButton)

function testSetState() {
  const state = shallow(<Atlas/>)
  state.instance().homeButtonSetStateVars()
}

test("Home Button Set State", testSetState)

function testMapZoom() {
  const zoom = shallow(<Atlas/>)
  zoom.instance().getMapZoom()
}

test("Get Map Zoom", testMapZoom)

function testPrevArray() {
  const prev = shallow(<Atlas/>)
  prev.instance().checkPrevArray()
}

test("Checking Previous Array", testPrevArray)

function testRenderLeafletMap() {
  const map = shallow(<Atlas/>)
  map.instance().renderLeafletMap()
}

test("Testing Render Leaflet Map", testRenderLeafletMap)

function testSearchBar() {
  const search = shallow(<Atlas/>)
  search.instance().setSearchBarCoords()
}

test("search Bar Coords", testSearchBar)

function setSearchTextIsEmpty(){
  const atlas = shallow(<Atlas/>)
  expect(atlas.state().searchTextToIsEmpty).toBe(true)
  atlas.instance().setSearchTextIsEmpty(false)
  expect(atlas.state().searchTextToIsEmpty).toBe(false)
}

test("TestSearchTextIsEmpty", setSearchTextIsEmpty)

function setSearchTextIsNotEmpty(){
  const atlas = shallow(<Atlas/>)
  expect(atlas.state().searchTextToIsEmpty).toBe(true)
  atlas.instance().setSearchTextIsEmpty(false)
  atlas.instance().setSearchTextIsEmpty(true)
  expect(atlas.state().searchTextToIsEmpty).toBe(true)
}

test("TestSearchTextIsNotEmpty", setSearchTextIsNotEmpty)

function setWhereIsMarker(){
  const atlas = shallow(<Atlas/>)
  expect(atlas.state().whereIsMarker).toEqual(null)
  atlas.instance().setWhereIsMarker(L.latLng(0,0))
  expect(atlas.state().whereIsMarker).toEqual(L.latLng(0,0))
  expect(atlas.state().mapCenter).toEqual([L.latLng(0,0).lat, L.latLng(0,0).lng])
}

test("test setWhereIsMarker", setWhereIsMarker)

function testHelperHomeButton(){
  const atlas = shallow(<Atlas/>);
  atlas.instance().helperHomeButton();
}

test("test HelperHomeButton", testHelperHomeButton)

function testSetMarker() {
  const marker = shallow(<Atlas/>)
  let mapClickInfo = {latlng: {lat: 40, lng: -105}}
  marker.instance().setMarker(mapClickInfo)
}

test("Set Marker", testSetMarker)

function testSetTripPlaces() {
  const trip = shallow(<Atlas/>)
  let array = [];
  trip.instance().setTripPlaces(array);
  expect(trip.state().atlasTripPlaces.length).toEqual(0);
}

test("Test Set Trip Places", testSetTripPlaces)

function testSetMarkerEdge() {
  const mark = shallow(<Atlas/>);
  expect(mark.state().prevLocation.length).toEqual(2);
}

test("Set Marker edge case", testSetMarkerEdge)

function testSetSearchBar() {
  const search = shallow(<Atlas/>);
  let coords = L.latLng(40, -105)
  search.instance().setSearchBarCoords(coords);
  expect(search.state().markerPosition).toEqual(null)
}

test("Set Search Bar", testSetSearchBar)

function testSetSearchBarEdge() {
  const search = shallow(<Atlas/>);
  let coords = L.latLng(40, -105)
  search.instance().setSearchBarCoords(coords);
  expect(search.state().mapCenter.length).toEqual(2)
}

test("Set Search Bar", testSetSearchBarEdge)

function testSetSearchBarEdge2() {
  const search = shallow(<Atlas/>);
  let coords = L.latLng(40, -105)
  search.instance().setSearchBarCoords(coords);
  expect(search.state().mapCenter[0]).toEqual(40.5734)
  expect(search.state().mapCenter[1]).toEqual(-105.0865)
}

test("Set Search Bar", testSetSearchBarEdge2)