package com.tco.requests;

import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.LinkedHashMap;
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
    @DisplayName("Version number is equal to 3")
    public void testVersion() {
        int version = fin.getRequestVersion();
        assertEquals(3, version);
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
        List<LinkedHashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(0)).get("name");

        if (!hasTravis) { assertEquals("'S Gravenvoeren heliport", name);}
        else{ assertEquals("Aappilattoq (Kujalleq) Heliport", name);}
    }

    @Test
    @DisplayName("latitude name should be 50.764771 via pattern: 'port'")
    public void testPlacesLatitude(){
        fin.buildResponse();
        List<LinkedHashMap<String, String>> places = fin.getPlaces();
        String lat = (places.get(0).get("latitude"));

        if (!hasTravis) { assertEquals("50.764771", lat); }
        else { assertEquals("60.148357", lat); }
    }

    @Test
    @DisplayName("name should be ?eská T?ebová Airstrip: 'strip' with no limit")
    public void test1Name(){
        //fin = new RequestFind("strip", 0);
        fin.buildResponse();
        List<LinkedHashMap<String, String>> places = fin.getPlaces();
        String name = (places.get(1)).get("name");

        if (!hasTravis) { assertEquals("'s Gravenwezel heliport", name); }
        else { assertEquals("Aappilattoq (Qaasuitsup) Heliport", name); }
    }

    @Test
    @DisplayName("long should be 16.455278 via pattern: 'strip' with no limit")
    public void test1Long(){
        //fin = new RequestFind("strip", 0);
        fin.buildResponse();
        List<LinkedHashMap<String, String>> places = fin.getPlaces();
        String longitude = (places.get(1)).get("longitude");

        if (!hasTravis) { assertEquals("4.542778015136719", longitude); }
        else { assertEquals("-55.5962866545", longitude); }
    }

    @Test
    public void testFound(){
        //fin = new RequestFind("strip", 2);
        fin.buildResponse();
        int found = fin.getFound();

        if (!hasTravis) { assertEquals(150, found); }
        else { assertEquals(3, found) ;}
    }

    @Test
    public void testNoMatchANDLimit(){
        fin = new RequestFind("", 0);
        fin.buildResponse();
        int found = fin.getFound();

        if (!hasTravis) { assertEquals(1, found); }
        else { assertEquals(1, found) ;}
    }

    @Test
    public void testNoMatchHASLimit(){
        fin = new RequestFind("", 14);
        fin.buildResponse();
        int found = fin.getFound();

        if (!hasTravis) { assertEquals(14, found); }
        else { assertEquals(3, found) ;}
    }

    @Test
    public void testInvalidChar(){
        fin = new RequestFind("+", 0);
        fin.buildResponse();
        List<LinkedHashMap<String, String>> places = fin.getPlaces();
        String country = (places.get(0)).get("country");

        assertEquals("Germany", country);
    }
}