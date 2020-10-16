import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import WhereIs from "../src/components/Atlas/WhereIs";

function testRenderWhereIs() {
    const panel = shallow(<WhereIs/>)
    panel.instance().renderWhereIsPanel()
}

test("Where Is Testing", testRenderWhereIs)