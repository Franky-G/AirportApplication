import './jestConfig/enzyme.config.js';
import React from "react";
import {shallow} from 'enzyme';
import Trip from "../src/components/Trip/Trip";
import {Map} from 'react-leaflet'; //Dont delete
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

function initialMyClass() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().myclass;
    expect (initial).toEqual('');
}

test("Initial State myclass", initialMyClass);

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

function initialTrips() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().trips;
    expect (initial).toEqual([]);
}

test("Initial State Trips", initialTrips);

function initialTripPlaces() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().tripPlaces;
    expect (initial).toEqual([]);
}

test("Initial State Trip Places", initialTripPlaces);

function initialIndex() {
    const expected = shallow(<Trip/>);
    let initial = expected.state().index;
    expect (initial).toEqual(0);
}

test("Initial State Index", initialIndex);

function toggleButtonColorTest(){
    const trip = shallow(<Trip/>);
    let color = trip.instance().toggleButtonColor()
    expect(color).toEqual("danger");
}
test("ToggleButtonColor", toggleButtonColorTest)

function testAddATrip(){
    const trip = shallow(<Trip/>)
    let initial = trip.state().trips.length
    expect(initial).toEqual(0);
    trip.instance().addATrip();
    initial = trip.state().trips.length
    expect(initial).toEqual(1);
    trip.instance().addATrip();
    expect(trip.state().trips[1]).toEqual([])
}

test("TestAddTrip", testAddATrip)

function testRenderPlaceList(){
    const trip = shallow(<Trip/>)
    trip.setState({tripPlaces: [L.latLng(0,0), L.latLng(0,0), L.latLng(0,0)]})
    trip.instance().renderSearchList()
    trip.instance().renderTripList()
    expect(trip.state().tripPlaces.length).toEqual(3)
}

test("TestRenderPlaceList", testRenderPlaceList)

function testRemoveAPlace(){
    const trip = shallow(<Trip/>)
    trip.setState({tripPlaces: [L.latLng(0,0), L.latLng(0,0), L.latLng(0,0)]})
    expect(trip.state().tripPlaces.length).toEqual(3);
    trip.instance().removeAPlace();
    expect(trip.state().tripPlaces.length).toEqual(2)
}

test("TestRemoveAPlace", testRemoveAPlace)

function testRemoveATrip(){
    const trip = shallow(<Trip/>)
    trip.setState({trips: [[L.latLng(0,0)], [L.latLng(0,0)], [L.latLng(0,0)]]})
    expect(trip.state().trips.length).toEqual(3);
    trip.instance().removeATrip();
    expect(trip.state().trips.length).toEqual(2)
}

test("TestRemoveATrip", testRemoveATrip)

function testResetTripPlaces(){
    const trip = shallow(<Trip/>)
    trip.instance().resetTripPlaces();
    expect(trip.state().trips).toEqual([])
    expect(trip.state().tripPlaces).toEqual([])
    trip.setState({tripPlaces: [L.latLng(0,0)]})
    trip.instance().resetTripPlaces();
    expect(trip.state().tripPlaces).toEqual([])
    expect(trip.state().trips).toEqual([])
    trip.setState({trips: [[L.latLng(0,0), L.latLng(0,0)]]})
    trip.instance().resetTripPlaces();
    expect(trip.state().trips.length).toEqual(1)
}

test("TestResetTripPlaces", testResetTripPlaces)

function testDistanceCalc(){
    const trip = shallow(<Trip/>)
    expect(trip.state().tripPlaces).toEqual([])
    let places = '[{"lat":40.89427932709685,"lng":-106.68509331531826},{"lat":36.197684669556466,"lng":-102.95057724108594}]'
    places = JSON.parse(places)
    trip.instance().calculateTripDistance(places)
    expect(trip.state().distance).toEqual(0)
}
test("Test Trip Distance", testDistanceCalc)

function testTripDistance(){
    const trip = shallow(<Trip/>)
    trip.instance().formatTripDistance()
    expect(trip.state().tripPlaces).toEqual([])
}
test("Test Format Trip Distance", testTripDistance)