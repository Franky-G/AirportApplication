package com.tco.requests;

import com.tco.requests.RequestDistance;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestDistance {

    private Map <String, String> place1;
    private Map <String, String> place2;
    private RequestDistance dist;


    @BeforeEach
    public void createConfigurationForTestCases(){
        dist = new RequestDistance();
        dist = new RequestDistance(3959.00, "41", "-109", "37", "-102");
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
        Double temp = dist.getEarthRadius();
        assertEquals(3959, temp);
    }

    @Test
    @DisplayName("Place 1 and Place 2")
    public void testPlace1Place2() {
        place1 = dist.getPlace1();
        place2 = dist.getPlace2();
        Double latplace1 = (Double.valueOf(place1.get("latitude"))).doubleValue();
        Double longplace1 = (Double.valueOf(place1.get("longitude"))).doubleValue();
        Double latplace2 = (Double.valueOf(place2.get("latitude"))).doubleValue();
        Double longplace2 = (Double.valueOf(place2.get("longitude"))).doubleValue();
        assertEquals(41, latplace1);
        assertEquals(-109, longplace1);
        assertEquals(37, latplace2);
        assertEquals(-102, longplace2);
    }

    @Test
    @DisplayName("Request Type is \"distance\"")
    public void testDistance() {
        dist.buildResponse();
        assertEquals(466, dist.getDistance());
    }

    @Test
    @DisplayName("Test Fort Collins to Sydney")
    public void testCOSydney() {
        dist = new RequestDistance(3959.00, "40.6", "-105.1", "-33.9", "151.2");
        dist.buildResponse();
        assertEquals(8348, dist.getDistance());
    }

    @Test
    @DisplayName("Test1")
    public void test1() {
        dist = new RequestDistance(6371008771.4, "40.416775", "-3.703790", "-41.276825", "174.777969");
        dist.buildResponse();
        assertEquals(19855573534l, dist.getDistance());
    }

    @Test
    @DisplayName("test2")
    public void test2() {
        dist = new RequestDistance(6378159999999974.00, "40.5734", "-105.0865", "40.5734", "-105.08650000000001");
        dist.buildResponse();
        assertEquals(1, dist.getDistance());
    }

}
