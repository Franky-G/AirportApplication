package com.tco.requests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestTrip {

    private RequestTrip trip;
    private HashMap <String, String> temp;
    private HashMap <String, String> temp3;
    private HashMap <String, String> temp4;
    private HashMap[] temp2;

    @BeforeEach
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        temp2 = new HashMap[3];
        temp = new HashMap<>();
        temp3 = new HashMap<>();
        temp4 = new HashMap<>();
        temp.put("name", "Denver");
        temp.put("latitude", "39.7");
        temp.put("longitude", "-105.0");
        temp2[0] = temp;
        temp3.put("name", "Boulder");
        temp3.put("latitude", "40.0");
        temp3.put("longitude", "-105.4");
        temp2[1] = temp3;
        temp4.put("name", "Fort Collins");
        temp4.put("latitude", "40.6");
        temp4.put("longitude", "-105.1");
        temp2[2] = temp4;
        trip = new RequestTrip("test", "3959.0", temp2);
    }

    @Test
    @DisplayName("Version number is equal to 3")
    public void testVersion() {
        int version = trip.getRequestVersion();
        assertEquals(3, version);
    }

    @Test
    @DisplayName("Request type is \"trip\"")
    public void testType() {
        String type = trip.getRequestType();
        assertEquals("trip", type);
    }

    @Test
    @DisplayName("Trip Title")
    public void testTitle() {
        String title = trip.getTitle();
        assertEquals("test", title);
    }

    @Test
    @DisplayName("Earth Radius")
    public void testEarthRadius() {
        String earthRadius = trip.getEarthRadius();
        assertEquals("3959.0", earthRadius);
    }

    @Test
    @DisplayName("Place 1")
    public void testPlace1() {
        Map <String, String> testPlaces[] = trip.getPlaces();
        assertEquals("Denver", testPlaces[0].get("name"));
        assertEquals("39.7", testPlaces[0].get("latitude"));
        assertEquals("-105.0", testPlaces[0].get("longitude"));
    }

    @Test
    @DisplayName("Place 2")
    public void testPlace2() {
        Map <String, String> testPlaces[] = trip.getPlaces();
        assertEquals("Boulder", testPlaces[1].get("name"));
        assertEquals("40.0", testPlaces[1].get("latitude"));
        assertEquals("-105.4", testPlaces[1].get("longitude"));
    }

    @Test
    @DisplayName("Place 3")
    public void testPlace3() {
        Map <String, String> testPlaces[] = trip.getPlaces();
        assertEquals("Fort Collins", testPlaces[2].get("name"));
        assertEquals("40.6", testPlaces[2].get("latitude"));
        assertEquals("-105.1", testPlaces[2].get("longitude"));
    }
}
