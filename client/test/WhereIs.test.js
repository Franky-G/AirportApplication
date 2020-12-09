import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import WhereIs from "../src/components/Atlas/WhereIs";

function testRenderWhereIs() {
    const panel = shallow(<WhereIs/>)
    panel.instance().renderWhereIsPanel()
}

test("Where Is Testing", testRenderWhereIs)

function testFetch() {
    const fetch = shallow(<WhereIs/>)
    fetch.instance().fetchAddressData(0, 0)
    expect(fetch.state().address).toEqual("")
}

test("Fetch Data", testFetch)