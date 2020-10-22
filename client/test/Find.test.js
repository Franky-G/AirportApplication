import './jestConfig/enzyme.config.js';
import React from "react";
import { shallow } from 'enzyme';
import Find from "../src/components/Atlas/Find";
import {sendServerRequest} from "../src/utils/restfulAPI";

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

function addListGroupItemT(){
    const temp = shallow(<Find/>);
    const initial = temp.state().searchArray;
    initial.push(0,0);
    temp.instance().addListGroupItem(1);
}

test("Add to list", addListGroupItemT);

function testClickOutside(){
    const fin = shallow(<Find/>);
    fin.instance().handleClickOutside();
}

test("Click Outside", testClickOutside);

function testRenLocMod(){
    const fin = shallow(<Find/>);
    const arr = [{name: "searchBar", style: {margin: 5, width: "97%"}, placeholder: "Enter name of place"}];
    fin.instance().renderLocationModule(arr);
}

test ("Render Location Module", testRenLocMod);

function testRenSearchList(){
    const fin = shallow(<Find/>);

    fin.instance().renderSearchList();
}

test ("Render Search List", testRenSearchList);

function testReturnPlaces(){
    const fin = shallow(<Find/>);
    let match = "dave";
    let limit = 10;
    sendServerRequest({requestType: "find", requestVersion: 2, match: match, limit: limit})
        .then(places => {
            try{
                let outerArray = [];
                for (let i = 0; i < limitInt; ++i) {
                    let elementArray = []
                    if (places.data.places[i] !== undefined) {
                        elementArray.push(places.data.places[i].name);
                        elementArray.push(places.data.places[i].latitude);
                        elementArray.push(places.data.places[i].longitude);
                    }
                    outerArray.push(elementArray);
                }
            } catch (error){
                console.log(error)
            }
        });
    fin.instance().returnPlaces();
}

test ("Send return places", testReturnPlaces);

function testServerRequest(){
    const fin = shallow(<Find/>);
    fin.instance().sendFindServerRequest("dave", 2);
}

test("Send find server Request", testServerRequest);

function testWillUnmount() {
    const mount = shallow(<Find/>)
    mount.instance().componentWillUnmount()
}

test("Component Will Unmount", testWillUnmount)

function testSearchList() {
    const list = shallow(<Find/>)
    list.instance().renderSearchList()
}

test("Rendering Search List", testSearchList)

function testSetWrapper() {
    const wrapper = shallow(<Find/>)
    wrapper.instance().setWrapperRef()
}

test("Set Wrapper", testSetWrapper)

function testRenderMain() {
    const main = shallow(<Find/>)
    main.instance().render()
}

test("Rendering render", testRenderMain)

function testHelpClickOutside() {
    const click = shallow(<Find/>)
    click.instance().handleClickOutside()
    expect(click.state().searchIsOn).toEqual(false)
}

test("Handle Click Outside", testHelpClickOutside)

function testServerRequest2() {
    const request = shallow(<Find/>)
    request.instance().sendFindServerRequest("dave", 20)
}

test("Server Request", testServerRequest2)