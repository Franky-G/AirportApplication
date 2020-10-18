import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import About from "../src/components/About/About";

function testRender() {
    const render = shallow(<About/>)
    render.instance().render()
}

test("Testing Render", testRender)