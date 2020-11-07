package com.tco.requests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestTrip {

    private RequestTrip trip;
    private Map<String, String>[] places;
    private Map<String, String> options;
    private Map<String, String> optionsTest2;

    private RequestTrip trip2;
    private HashMap[] trip2Trips;

    @BeforeEach
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        this.options = new HashMap<>();
        this.options.put("title", "test");
        this.options.put("earthRadius", "3959.0");
        this.options.put("units", "miles");
        this.places = new HashMap[3];
        this.places[0] = new HashMap<>();
        this.places[0].put("name", "Denver");
        this.places[0].put("latitude", "39.7");
        this.places[0].put("longitude", "-105.0");
        this.places[1] = new HashMap<>();
        this.places[1].put("name", "Boulder");
        this.places[1].put("latitude", "40.0");
        this.places[1].put("longitude", "-105.4");
        this.places[2] = new HashMap<>();
        this.places[2].put("name", "Fort Collins");
        this.places[2].put("latitude", "40.6");
        this.places[2].put("longitude", "-105.1");
        trip = new RequestTrip(this.options, this.places);

        trip2 = new RequestTrip();
        this.optionsTest2 = new HashMap<>();
        trip2Trips = new HashMap[2];
        this.optionsTest2.put("title", "2 dest test");
        this.optionsTest2.put("earthRadius", "3959.0");
        this.optionsTest2.put("response", "0.0");
        this.optionsTest2.put("units", "kilometers");
        HashMap<String, String> trip2Dest = new HashMap<>();
        trip2Dest.put("name", "New York");
        trip2Dest.put("latitude", "40.743970970422126");
        trip2Dest.put("longitude", "-73.98034986457789");
        trip2Trips[0] = trip2Dest;
        HashMap<String, String> trip2Dest1 = new HashMap<>();
        trip2Dest1.put("name", "Redondo Beach");
        trip2Dest1.put("latitude", "33.84470872576988");
        trip2Dest1.put("longitude", "-118.3959402004257");
        trip2Trips[1] = trip2Dest1;
        trip2 = new RequestTrip(this.optionsTest2, trip2Trips);
    }

    @Test
    @DisplayName("Version number is equal to 4")
    public void testVersion() {
        int version = trip.getRequestVersion();
        assertEquals(4, version);
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

    @Test
    @DisplayName("Test Trip Denver to Boulder")
    public void testTrip() {
        trip.buildResponse();
        Long [] getDistance = trip.getTripDistance();
        assertEquals(30, getDistance[0]);
    }

    @Test
    @DisplayName("Test Trip Boulder to Fort Collins")
    public void testTrip2() {
        trip.buildResponse();
        Long [] getDistance = trip.getTripDistance();
        assertEquals(44, getDistance[1]);
    }

    @Test
    @DisplayName("Test Trip Fort Collins to Denver")
    public void testTrip3() {
        trip.buildResponse();
        Long[] getDistance = trip.getTripDistance();
        assertEquals(62, getDistance[2]);
    }

    @Test
    @DisplayName("Version number is equal to 4 Trip 2")
    public void testVersionTrip2() {
        int version = trip2.getRequestVersion();
        assertEquals(4, version);
    }

    @Test
    @DisplayName("Request type is \"trip\" Trip 2")
    public void testTypeTrip2() {
        String type = trip2.getRequestType();
        assertEquals("trip", type);
    }

    @Test
    @DisplayName("Trip Title Trip 2")
    public void testTitleTrip2() {
        String title = trip2.getTitle();
        assertEquals("2 dest test", title);
    }

    @Test
    @DisplayName("Earth Radius Trip 2")
    public void testEarthRadiusTrip2() {
        String earthRadius = trip2.getEarthRadius();
        assertEquals("3959.0", earthRadius);
    }

    @Test
    @DisplayName("Response Trip 2")
    public void testResponseTrip2() {
        String response = trip2.getResponse();
        assertEquals("0.0", response);
    }

    @Test
    @DisplayName("Place 1 Trip 2")
    public void testPlace1Trip2() {
        Map <String, String> testPlaces[] = trip2.getPlaces();
        assertEquals("New York", testPlaces[0].get("name"));
        assertEquals("40.743970970422126", testPlaces[0].get("latitude"));
        assertEquals("-73.98034986457789", testPlaces[0].get("longitude"));
    }

    @Test
    @DisplayName("Place 2 Trip 2")
    public void testPlace2Trip2() {
        Map <String, String> testPlaces[] = trip2.getPlaces();
        assertEquals("Redondo Beach", testPlaces[1].get("name"));
        assertEquals("33.84470872576988", testPlaces[1].get("latitude"));
        assertEquals("-118.3959402004257", testPlaces[1].get("longitude"));
    }

    @Test
    @DisplayName("Distance Trip 2")
    public void testDistanceTrip2() {
        trip2.buildResponse();
        Long[] distances = new Long[trip2.getTripDistance().length];
        distances[0] = trip2.getTripDistance()[0];
        assertEquals(2461, distances[0]);
    }

    @Test
    @DisplayName("Total Distance Trip 2")
    public void testTotalDistanceTrip2() {
        trip2.buildResponse();
        assertEquals(2461, trip2.getTotalTripDistance());
    }

    @Test
    @DisplayName("Total Distance Trip 1")
    public void testTotalDistanceTrip1() {
        trip.buildResponse();
        assertEquals(136, trip.getTotalTripDistance());
    }

    @Test
    @DisplayName("Test Units for Trip")
    public void testUnits() {
        trip.buildResponse();
        assertEquals("miles", trip.getUnits());
        trip2.buildResponse();
        assertEquals("kilometers", trip2.getUnits());
    }
}
