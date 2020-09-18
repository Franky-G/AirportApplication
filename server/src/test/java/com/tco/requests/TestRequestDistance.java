package com.tco.requests;

import com.tco.requests.RequestDistance;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestDistance {

    private RequestDistance dist;
    private Map <String, String> place1;
    private Map <String, String> place2;

    @BeforeEach
    public void createConfigurationForTestCases(){
        dist = new RequestDistance();
        place1 = new HashMap<>();
        place2 = new HashMap<>();
        dist.buildResponse();
    }

    @Test
    @DisplayName("Version number is equal to 2")
    public void testVersion() {
        int version = dist.getRequestVersion();
        assertEquals(2, version);
    }

    @Test
    @DisplayName("Request type is \"distance\"")
    public void testType() {
        String type = dist.getRequestType();
        assertEquals("distance", type);
    }

    @Test
    @DisplayName("Earth Radius is 3959.00")
    public void testEarthRadius() {
        double temp = dist.getEarthRadius();
        assertEquals(3959.00, temp);
    }

    @Test
    public void testPlace1() {
        this.place1.put("latitude", "40.6");
        this.place1.put("longitude", "-105.1");
        double latplace1 = (Double.valueOf(place1.get("latitude"))).doubleValue();
        double longplace1 = (Double.valueOf(place1.get("longitude"))).doubleValue();
        assertEquals(40.6, latplace1);
        assertEquals(-105.1, longplace1);
    }

    @Test
    public void testPlace2() {
        this.place2.put("latitude", "-33.9");
        this.place2.put("longitude", "151.2");
        double latplace2 = (Double.valueOf(place2.get("latitude"))).doubleValue();
        double longplace2 = (Double.valueOf(place2.get("longitude"))).doubleValue();
        assertEquals(-33.9, latplace2);
        assertEquals(151.2, longplace2);
    }

    /*@Test
    public void testDistance() {
        double temp = dist.getDistance();
        assertEquals(8348, temp);
    }*/

}
