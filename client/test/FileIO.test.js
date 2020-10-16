import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import FileIO from "../src/components/Atlas/FileIO";

global.URL.createObjectURL = jest.fn();

function testModal() {
    const modal = shallow(<FileIO/>)
    modal.instance().openLoadModal()
}

test("Load Modal", testModal)

function testOpenModal() {
    const open = shallow(<FileIO/>)
    open.instance().openModal()
    expect(open.state().isOpen).toEqual(true)
}

test("Open Modal", testOpenModal)

function testDownloadFile() {
    const file = shallow(<FileIO/>)
    file.instance().downloadFile()
}

test("Download File", testDownloadFile)