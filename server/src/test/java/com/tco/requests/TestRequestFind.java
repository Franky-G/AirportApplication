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
        fin = new RequestFind("%port", 500);
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
    @DisplayName("match should be salt%")
    public void testMatch(){
        String match = fin.getMatch();
        assertEquals("%port", match);
    }

    @Test
    @DisplayName("limit should be 500")
    public void testLimit(){
        int limit = fin.getLimit();
        assertEquals(500, limit);
    }

    @Test
    @DisplayName("found should be 1759 via pattern: '%strip' with no limit")
    public void testLimitZero(){
        fin = new RequestFind("%strip", 0);
        fin.buildResponse();

        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");
        int found = fin.getFound();

        assertEquals("1669 Diamondview Road Private Strip", name);
        assertEquals(1759, found);
    }

    @Test
    @DisplayName("name should be Salt Box Airport via pattern: 'salt%'")
    public void testPlacesName(){
        fin = new RequestFind("salt%", 5);
        fin.buildResponse();

        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        assertEquals("Salt Box Airport", name);
    }

    @Test
    @DisplayName("last name should be Glorioso Islands Airstrip via pattern: salt%")
    public void testPlacesLatitude(){
        fin = new RequestFind("salt%", 5);
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String lat = (places.get(0).get("latitude"));
        assertEquals("41.32426452636719", lat);
    }
}