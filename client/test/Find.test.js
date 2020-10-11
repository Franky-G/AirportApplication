import './jestConfig/enzyme.config.js';
import React from "react";
import { shallow } from 'enzyme';
import Find from "../src/components/Atlas/Find";

function simulateOnClick(button, parentWrapper) {
    button.simulate('click');
    parentWrapper.update();
}

function testNumberFound() {
    const numberFound = shallow(<Find/>);
    let initialValue = numberFound.state().numberFound;
    expect(initialValue).toEqual(0);
}

test("Number Found", testNumberFound);

function testSendServerRequest() {
    const request = shallow(<Find/>);
    let initial = request.state().searchIsOn;
    expect(initial).toEqual(false);
}

test("Server Request", testSendServerRequest);

function testSearchIsOn() {
    const places = shallow(<Find/>);
    simulateOnClick(places.find('div'), places);
    let click = places.state().searchIsOn;
    expect(click).toEqual(false);
}

test("Search Is On", testSearchIsOn);

function initialSearchArray() {
    const array = shallow(<Find/>);
    let initial = array.state().searchArray;
    expect(initial).toEqual([]);
}

test("Search Array", initialSearchArray);

function initialNumberFound() {
    const found = shallow(<Find/>);
    let initial = found.state().numberFound;
    expect(initial).toEqual(0);
}

test("Number Found", initialNumberFound);

function initialSearchBarText() {
    const search = shallow(<Find/>);
    let initial = search.state().searchBarText;
    expect(initial).toEqual("");
}

test("Search Bar Text", initialSearchBarText);
