import './jestConfig/enzyme.config.js';
import React from "react";
import TripObject from "../src/components/Trip/TripObject";
import {Map} from 'react-leaflet'; //Dont delete

function testAddPlaces(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.places.push(L.latLng(0, 0))
    let testArray = object.places
    expect(testArray.length).toEqual(2)
}

test("testAddPlaces", testAddPlaces)

function testSetName(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.setName("changed")
    let testString = object.name
    expect(testString).toEqual("changed")
}

test("testSetName", testSetName)

function testSetPlaces(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.setPlaces([L.latLng(40, -105)])
    let testArray = object.places
    expect(testArray).toEqual([L.latLng(40, -105)])
}

test("testSetName", testSetPlaces)

function testSetNote(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.setNote("changed")
    let testArray = object.note
    expect(testArray).toEqual("changed")
}

test("testSetNote", testSetNote)

function testPositionUp(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4)], "test note")
    object.positionUp(1)
    let testArray = object.places
    expect(testArray).toEqual([L.latLng(3, 4), L.latLng(1, 2)])
}

test("testPositionUp", testPositionUp)

function testPositionDown(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4)], "test note")
    object.positionDown(0)
    let testArray = object.places
    expect(testArray).toEqual([L.latLng(3, 4), L.latLng(1, 2)])
}

test("testPositionDown", testPositionDown)

function testModify(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4)], "test note")
    object.modify("changed", [L.latLng(1, 2)], "changed note")
    let testObject = object;
    expect(testObject.name).toEqual("changed")
    expect(testObject.places).toEqual([L.latLng(1, 2)])
    expect(testObject.note).toEqual("changed note")
}

test("testModify", testModify)

function testModifyStart(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4), L.latLng(5,6)], "test note")
    object.modifyStart(2)
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([L.latLng(5, 6), L.latLng(1, 2), L.latLng(3,4)])
    expect(testObject.note).toEqual("test note")
}

test("testModifyStart", testModifyStart)

function testRemovePlace(){
    const object = new TripObject("test", [L.latLng(0, 0), L.latLng(0, 0)], "test note")
    object.removePlace(1)
    let testObject = object
    expect(testObject.places.length).toEqual(1)
    expect(testObject.places).toEqual([L.latLng(0, 0)])
}

test("testRemovePlace", testRemovePlace)

function testRemoveNote(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.removeNote()
    let testNote = object.note
    expect(testNote).toEqual("")
}

test("testRemoveNote", testRemoveNote)

function testResetPlaces(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.resetPlaces()
    let testArray = object.places
    expect(object.name).toEqual("test")
    expect(testArray).toEqual([])
    expect(object.note).toEqual("test note")
}

test("testRemoveNote", testResetPlaces)

function testReversePlaces(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4), L.latLng(5,6), L.latLng(7, 8)], "test note")
    object.reversePlaces()
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([L.latLng(7, 8), L.latLng(5, 6), L.latLng(3,4), L.latLng(1, 2)])
    expect(testObject.note).toEqual("test note")
}

test("testReversePlaces", testReversePlaces)

function testReversePlacesAt(){
    const object = new TripObject("test", [L.latLng(1, 2), L.latLng(3, 4), L.latLng(5,6), L.latLng(7, 8)], "test note")
    object.reversePlacesAt(1)
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([L.latLng(1, 2), L.latLng(7, 8), L.latLng(5,6), L.latLng(3, 4)])
    expect(testObject.note).toEqual("test note")
}

test("testReversePlacesAt", testReversePlacesAt)