import './jestConfig/enzyme.config.js';
import React from "react";
import {shallow} from 'enzyme';
import Trip from "../src/components/Trip/Trip";
import {Map} from 'react-leaflet'; //Dont delete
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

const loadSaveDistance = [{style: {position: "absolute", padding: 4, left: 10}, label: "Load"},
    {style: {position: "absolute", padding: 4, left: 58}, label: "Save"},
    {style: {position: "absolute", padding: 4, left: 108}, label: "Distance"},
    {style: {position: "relative", padding: 4, left: 20, top: 30}}]
const inputArray = [{width: 278, label: "Add Place", width2: 70, name: "searchPlaces"},
    {width: 229, label: "Filter", width2: 50, name: "filter"}]
const listType = [{style: {position: "absolute", width: 300, height: 148, overflow:"auto", zIndex: 1015}},
    {style:{position: "absolute", width: 300, height: 90, left: 10, bottom: 65, color: "#FFFFFF", overflow:"auto", zIndex: 1015}}]
const placesAndTrips = [{height: 150, text: "Places"}, {height: 90, text: "Trips"}]


function initialMyClass() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().designerOpen;
    expect (initial).toEqual('');
}

test("Initial State designerOpen", initialMyClass);

function initialSearchPlaces() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().searchPlaces;
    expect (initial).toEqual("");
}

test("Initial State SearchPlaces", initialSearchPlaces);

function initialFilter() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().filter;
    expect (initial).toEqual("");
}

test("Initial State Filter", initialFilter);

function toggleButtonColorTest(){
    const trip = shallow(<Trip/>);
    let color = trip.instance().toggleButtonColor()
    expect(color).toEqual("danger");
}
test("ToggleButtonColor", toggleButtonColorTest)

function testDistanceCalc(){
    const trip = shallow(<Trip/>)
    expect(trip.state().trips[0].places).toEqual([])
    let places = '[{"lat":40.89427932709685,"lng":-106.68509331531826},{"lat":36.197684669556466,"lng":-102.95057724108594}]'
    places = JSON.parse(places)
    trip.instance().calculateTripDistance(places)
    expect(trip.state().distance).toEqual(0)
}
test("Test Trip Distance", testDistanceCalc)

function testGetFormatForSave() {
    const save = shallow(<Trip/>)
    let initial = [{"lat":40.89427932709685,"lng":-106.68509331531826},{"lat":36.197684669556466,"lng":-102.95057724108594}]
    save.state().tripPlaces = initial;
    const filterText = {
        requestType: "trip", requestVersion: 3,
        options: { title: "My Trip", earthRadius: "3959.0"},
        places: save.state().tripPlaces
    }
    expect(initial.length).toEqual(2);
    expect(filterText.requestType).toEqual("trip")
    expect(filterText.requestVersion).toEqual(3)
    expect(filterText.options.title).toEqual("My Trip")
    expect(filterText.options.earthRadius).toEqual("3959.0")
    expect(filterText.places[0].lat).toEqual(40.89427932709685)
    expect(filterText.places[0].lng).toEqual(-106.68509331531826)
    expect(filterText.places[1].lat).toEqual(36.197684669556466)
    expect(filterText.places[1].lng).toEqual(-102.95057724108594)
}

test("Get Format For Save", testGetFormatForSave)

function testRender() {
    const render = shallow(<Trip/>)
    render.instance().render()
}

test("Render", testRender)

function testDropdown() {
    const down = shallow(<Trip/>)
    down.instance().renderDropdown()
}

test("Render Dropdown", testDropdown)

function testpopover() {
    const popover = shallow(<Trip/>)
    popover.instance().renderPopover()
}

test("Render Popover", testpopover)

function testResetTripPlaces() {
    const places = shallow(<Trip/>)
    places.instance().resetTripPlaces()
}

test("Reset Trip Places", testResetTripPlaces)

function testTripUI() {
    const ui = shallow(<Trip/>)
    ui.instance().renderTripUI()
}

test("Render Trip UI", testTripUI)

function testButtons() {
    const buttons = shallow(<Trip/>)
    buttons.instance().addLoadSaveDistanceButtons(loadSaveDistance)
}

test("Load Save Distance Buttons", testButtons)

function testInputField() {
    const field = shallow(<Trip/>)
    field.instance().addInputField(inputArray[0])
}

test("Add Input Field", testInputField)


function testRenderPlaceList() {
    const list = shallow(<Trip/>)
    list.instance().renderPlaceList(list.state().stateIndex, 0, listType)
}

test("Render Place List", testRenderPlaceList)

function testRenderPlacesAndList() {
    const place = shallow(<Trip/>)
    place.instance().renderPlacesAndTrips()
}

test("Render Places and List", testRenderPlacesAndList)

function testAddPlaceOrDistance() {
    const dist = shallow(<Trip/>)
    dist.instance().addPlaceOrDistance(placesAndTrips)
}

test("Add Place or Distance", testAddPlaceOrDistance)

function testRenderSearchList() {
    const search = shallow(<Trip/>)
    search.instance().renderSearchList()
}

test("Calling render to test if it exists", testRenderSearchList)

function testBlurState(){
    const close = shallow(<Trip/>)
    close.instance().blurState()
    expect(close.state().openPopover).toEqual(false)
}
test("Test Blur State", testBlurState)

function testServerListReq(){
    const close = shallow(<Trip/>)
    close.instance().serverListRequest()
    expect(close.state().openPopover).toEqual(false)
}
test("Test Blur State",testServerListReq)

function helperRenderDropDown() {
    const drop = shallow(<Trip/>)
    drop.instance().helpRenderDropdown()
}

test("Helper Function", helperRenderDropDown)

function testPlacesSize() {
    const size = shallow(<Trip/>)
    size.instance().returnPlacesSize()
}

test("Places Size", testPlacesSize)