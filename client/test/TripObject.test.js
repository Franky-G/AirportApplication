import './jestConfig/enzyme.config.js';
import React from "react";
import TripObject from "../src/components/Trip/TripObject";
import {Map} from 'react-leaflet'; //Dont delete
import Trip from "../src/components/Trip/Trip"

function testAddPlaces(){
    const object = new TripObject("test", [L.latLng(0, 0)], "test note")
    object.places.push(L.latLng(0, 0))
    let testArray = object.places;
    expect(testArray.length).toEqual(2)
}

test("testAddPlaces", testAddPlaces)

function testAddPlace(){
    const object = new TripObject("test", [[L.latLng(0, 0), 0, "test"]], "test note")
    object.addPlace(L.latLng(1,2), 0, "test")
    let testArray = object.places;
    expect(testArray.length).toEqual(2)
    expect(testArray).toEqual([[L.latLng(0, 0), 0, "test"], [L.latLng(1, 2), 0 , "test"]])
}

test("testAddPlace", testAddPlace)

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
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], L.latLng(3, 4)], "test note")
    object.positionUp(1)
    let testArray = object.places
    expect(testArray).toEqual([L.latLng(3, 4), [L.latLng(1, 2), 0 , "test"]])
    object.positionUp(0)
    expect(testArray).toEqual([L.latLng(3, 4), [L.latLng(1, 2), 0 , "test"]])
}

test("testPositionUp", testPositionUp)

function testPositionDown(){
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], L.latLng(3, 4)], "test note")
    object.positionDown(0)
    let testArray = object.places
    expect(testArray).toEqual([L.latLng(3, 4), [L.latLng(1, 2), 0 , "test"]])
    object.positionDown(1)
    expect(testArray).toEqual([L.latLng(3, 4), [L.latLng(1, 2), 0 , "test"]])
}

test("testPositionDown", testPositionDown)

function testModify(){
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], L.latLng(3, 4)], "test note")
    object.modify("changed", [[L.latLng(1, 2), 0 , "test"]], "changed note")
    let testObject = object;
    expect(testObject.name).toEqual("changed")
    expect(testObject.places).toEqual([[L.latLng(1, 2), 0 , "test"]])
    expect(testObject.note).toEqual("changed note")
}

test("testModify", testModify)

function testModifyStart(){
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], [L.latLng(3, 4), 0, "test"], [L.latLng(5, 6), 2 , "test"]], "test note")
    object.modifyStart(3)
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([[L.latLng(5, 6), 2 , "test"], [L.latLng(1, 2), 0, "test"], [L.latLng(3, 4), 0, "test"]])
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
    const object = new TripObject("test", [[L.latLng(0, 0), 0, "test"]], "test note")
    object.resetPlaces()
    let testArray = object.places
    expect(object.name).toEqual("test")
    expect(testArray).toEqual([])
    expect(object.note).toEqual("test note")
}

test("testRemoveNote", testResetPlaces)

function testReversePlaces(){
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], [L.latLng(3, 4), 1, "test"], [L.latLng(5, 6), 2 , "test"], [L.latLng(7, 8), 3 , "test"]], "test note")
    object.reversePlaces()
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([[L.latLng(7, 8), 3 , "test"], [L.latLng(5, 6), 2, "test"], [L.latLng(3, 4), 1 , "test"], [L.latLng(1, 2), 0 , "test"]])
    expect(testObject.note).toEqual("test note")
}

test("testReversePlaces", testReversePlaces)

function testReversePlacesAt(){
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], L.latLng(3, 4), [L.latLng(5, 6), 2 , "test"], [L.latLng(7, 8), 3 , "test"]], "test note")
    object.reversePlacesAt(2)
    let testObject = object;
    expect(testObject.name).toEqual("test")
    expect(testObject.places).toEqual([[L.latLng(1, 2), 0 , "test"], [L.latLng(7, 8), 3 , "test"], [L.latLng(5, 6), 2 , "test"], L.latLng(3, 4)])
    expect(testObject.note).toEqual("test note")
}

test("testReversePlacesAt", testReversePlacesAt)

function testMovePlace() {
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], [L.latLng(3, 4), 0, "test"], [L.latLng(5, 6), 2 , "test"], [L.latLng(7, 8), 3 , "test"]], "test note")
    object.movePlace("40,-105")
    expect(object.places).toEqual([[{"lat": 1, "lng": 2},0,"test"], [{"lat": 3, "lng": 4},0,"test"], [{"lat": 5, "lng": 6},2,"test"], [{"lat": 7, "lng": 8},3,"test"]])
}

test("Test Move Place", testMovePlace)

function testSetPlaceNote() {
    const object = new TripObject("test", [[L.latLng(1, 2), 0 , "test"], [L.latLng(3, 4), 0, "test"], [L.latLng(5, 6), 2 , "test"], [L.latLng(7, 8), 3 , "test"]], "test note")
    object.setPlaceNote("denver")
}

test("Set place note", testSetPlaceNote)

function testFilterPlaces() {
    const object = new TripObject("test", [[L.latLng(0, 0), 0, "test"]], "test note")
    object.filterPlaces("denver")
}

test("Test Filter Places", testFilterPlaces)

function testFilterCheck() {
    const object = new TripObject("test", [[L.latLng(0, 0), 0, "test"]], "test note")
    let initial = object.filterChecks("denver")
    expect(initial.length).toEqual(0)
}

test("Filter Checks", testFilterCheck)