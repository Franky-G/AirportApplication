package com.tco.requests;

import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {

    private RequestFind fin;

    @BeforeEach
    public void createConfigurationForTestCases(){
        fin = new RequestFind();
        fin = new RequestFind("port", 150);
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = fin.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Version number is equal to 2")
    public void testVersion() {
        int version = fin.getRequestVersion();
        assertEquals(2, version);
    }

    @Test
    @DisplayName("match should be port")
    public void testMatch(){
        String match = fin.getMatch();
        assertEquals("port", match);
    }

    @Test
    @DisplayName("limit should be 150")
    public void testLimit(){
        int limit = fin.getLimit();
        assertEquals(150, limit);
    }

    @Test
    @DisplayName("name should be 'S Gravenvoeren heliport via pattern: '%port'")
    public void testPlacesName(){
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        assertEquals("'S Gravenvoeren heliport", name);
    }

    @Test
    @DisplayName("latitude name should be 50.764771 via pattern: port")
    public void testPlacesLatitude(){
        //fin = new RequestFind("salt%", 150);
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String lat = (places.get(0).get("latitude"));
        assertEquals("50.764771", lat);
    }

    @Test
    @DisplayName("found should be 1759 via pattern: '%strip' with no limit")
    public void testLimitZero(){
        fin = new RequestFind("strip", 0);
        fin.buildResponse();

        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        assertEquals("1669 Diamondview Road Private Strip", name);
    }

    @Test
    @DisplayName("found should be 1759 via pattern: '%strip' with no limit")
    public void testFound(){
        fin = new RequestFind("strip", 5);
        fin.buildResponse();

        int found = fin.getFound();

        assertEquals(150, found);
    }
}