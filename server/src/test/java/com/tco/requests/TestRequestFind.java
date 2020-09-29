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
        fin = new RequestFind("gujarat", 100);
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
        assertEquals("gujarat", match);
    }

    @Test
    @DisplayName("limit should be 150")
    public void testLimit(){
        int limit = fin.getLimit();
        assertEquals(100, limit);
    }

    @Test
    @DisplayName("name should be Deesa Airport via pattern: 'gujarat'")
    public void testPlacesName(){
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        assertEquals("Deesa Airport", name);
    }

    @Test
    @DisplayName("latitude name should be 24.267900466918945 via pattern: 'gujarat'")
    public void testPlacesLatitude(){
        //fin = new RequestFind("salt%", 150);
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String lat = (places.get(0).get("latitude"));
        assertEquals("24.267900466918945", lat);
    }

    @Test
    @DisplayName("name should be Tongliao Airport via pattern: 'mongolia' with no limit")
    public void testLimitZeroName(){
        fin = new RequestFind("mongolia", 0);
        fin.buildResponse();

        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(13)).get("name");

        assertEquals("Tongliao Airport", name);
    }

    @Test
    @DisplayName("long should be 122.199997 via pattern: 'mongolia' with no limit")
    public void testLimitZeroLong(){
        fin = new RequestFind("mongolia", 0);
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String longitude = (places.get(13)).get("longitude");

        assertEquals("122.199997", longitude);
    }

    @Test
    @DisplayName("found should be 44 via pattern: 'san jose' with limit 13")
    public void testFound(){
        fin = new RequestFind("san jose", 13);
        fin.buildResponse();

        int found = fin.getFound();

        assertEquals(44, found);
    }
}