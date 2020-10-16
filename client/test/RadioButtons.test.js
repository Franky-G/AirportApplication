import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import RadioButtons from "../src/components/Atlas/RadioButtons";

function testRender() {
    const render = shallow(<RadioButtons/>)
    render.instance().render()
}

test("Render", testRender)

function testRenderRadioButtons() {
    const buttons = shallow(<RadioButtons/>)
    buttons.instance().renderRadioButtons()
}

test("Buttons", testRenderRadioButtons)