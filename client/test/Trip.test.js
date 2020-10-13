import './jestConfig/enzyme.config.js';
import React from "react";
import {shallow} from 'enzyme';
import Trip from "../src/components/Trip/Trip";

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
