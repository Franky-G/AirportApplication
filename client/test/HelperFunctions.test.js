import './jestConfig/enzyme.config.js';
import React from 'react'
import { shallow, mount } from 'enzyme';
import HelperFunctions from "../src/components/Atlas/HelperFunctions";
import {sendServerRequest} from "../src/utils/restfulAPI";

function testShowDistanceSearch() {
    const helperTemp = shallow(<HelperFunctions/>);

    let initialValue = helperTemp.state().showDistanceSearch;
    expect (initialValue).toEqual(false);
}

test('Search Distance From', testShowDistanceSearch);

function testDistanceButton() {
    const DistanceTemp = shallow(<HelperFunctions/>);

    simulateOnClick(DistanceTemp.find('button'), DistanceTemp);
    let firstClick = DistanceTemp.state().showDistanceSearch;
    expect(firstClick).toEqual(false);
}

function simulateOnClick(button, parentWrapper) {
    button.simulate('click');
    parentWrapper.update();
}

test('Testing distance button', testDistanceButton)

function testSearchButton() {
    const SearchButton = shallow(<HelperFunctions/>);

    simulateOnClick(SearchButton.find('button'), SearchButton);
    let firstClick = SearchButton.state().searchIsOn;
    expect(firstClick).toEqual(false);
}

test('Testing Search button', testSearchButton)

function testDistance() {
    const dist = shallow(<HelperFunctions/>);

    let actualValue = dist.state().distance;
    let temp = null;
    expect(actualValue).toEqual(temp);

    let lat1 = "20";
    let long1 = "10";
    let lat2 = "10";
    let long2 = "20";
    sendServerRequest({requestType: "distance", requestVersion: 2, earthRadius: 3959,
        place1: {latitude: lat1, longitude: long1},
        place2: {latitude: lat2, longitude: long2}}).then(distance => {
            if (distance) {
                temp = distance
            }
    });
    expect(temp).toEqual(actualValue);
}

test('Testing Distance', testDistance)
