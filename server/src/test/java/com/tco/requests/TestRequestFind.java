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
    private static boolean hasTravis = System.getenv("TRAVIS") != null && System.getenv("TRAVIS").equals("true");

    @BeforeEach
    public void createConfigurationForTestCases(){
        fin = new RequestFind();
        fin = new RequestFind("port", 100);
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
    @DisplayName("limit should be 100")
    public void testLimit(){
        int limit = fin.getLimit();
        assertEquals(100, limit);
    }

    @Test
    @DisplayName("name should be 'S Gravenvoeren heliport: 'port'")
    public void testPlacesName(){
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        if (!hasTravis) { assertEquals("'S Gravenvoeren heliport", name);}
        else{ assertEquals("Aappilattoq (Kujalleq) Heliport", name);}
    }

    @Test
    @DisplayName("latitude name should be 50.764771 via pattern: 'port'")
    public void testPlacesLatitude(){
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String lat = (places.get(0).get("latitude"));
        if (!hasTravis) { assertEquals("50.764771", lat); }
        else { assertEquals("60.148357", lat); }
    }

    @Test
    @DisplayName("name should be ?eská T?ebová Airstrip: 'strip' with no limit")
    public void testLimitZeroName(){
        //fin = new RequestFind("strip", 0);
        fin.buildResponse();

        List<HashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(21)).get("name");

        assertEquals("3-M's Airport", name);
    }

    @Test
    @DisplayName("long should be 16.455278 via pattern: 'strip' with no limit")
    public void testLimitZeroLong(){
        //fin = new RequestFind("strip", 0);
        fin.buildResponse();
        List<HashMap<String, String>> places = fin.getPlaces();
        String longitude = (places.get(21)).get("longitude");

        assertEquals("-84.36810302734375", longitude);
    }

    @Test
    @DisplayName("found should be 44 via pattern: 'san jose' with limit 13")
    public void testFound(){
        fin = new RequestFind("strip", 2);
        fin.buildResponse();

        int found = fin.getFound();

        if (!hasTravis) { assertEquals(150, found); }
        else { assertEquals(0, found) ;}
    }
}