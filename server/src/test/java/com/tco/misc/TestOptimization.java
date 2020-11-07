package com.tco.misc;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestOptimization {
    Map<String, String>[] places;
    Map<String, String>[] places1;
    Map<String, String>[] places2;
    Map<String, String> location;
    Map<String, String> options;

    private Optimization optPlaces;
    private Optimization optPlaces1;
    private Optimization optPlaces2;

    @BeforeEach
    public void testJimit(){
        options = new HashMap<>();
        options.put("earthRadius", "3959.0");

//////////////////////////////////////////////////////////////////////////////
        places = new HashMap[3];

        location = new HashMap<>();
        location.put("name" , "Denver");
        location.put("latitude" , "39.7392");
        location.put("longitude" , "-104.9903");
        places[0] = location;

        location = new HashMap<>();
        location.put("name" , "Center Of Map");
        location.put( "latitude" , "0");
        location.put("longitude" , "0");
        places[1] = location;

        location = new HashMap<>();
        location.put("name" , "Fort Collins");
        location.put("latitude" , "40.585258");
        location.put("longitude" , "-105.08441");
        places[2] = location;
////////////////////////////////////////////////////////////////////////////////
        places1 = new HashMap[5];

        location = new HashMap<>();
        location.put("name" , "FOCO");
        location.put("latitude" , "40.581");        //0
        location.put("longitude" , "-105.104");
        places1[0] = location;

        location = new HashMap<>();
        location.put("name" , "Wichita");           //DISTANCE ORDER *FROM* FOCO
        location.put("latitude" , "37.692");        //3
        location.put("longitude" , "-97.336");
        places1[1] = location;

        location = new HashMap<>();
        location.put("name" , "Colby");
        location.put("latitude" , "39.396");        //2
        location.put("longitude" , "-101.053");
        places1[2] = location;

        location = new HashMap<>();
        location.put("name" , "Otis");
        location.put("latitude" , "40.149");        //1
        location.put("longitude" , "-102.965");
        places1[3] = location;

        location = new HashMap<>();
        location.put("name" , "Galveston");
        location.put("latitude" , "29.298");        //4
        location.put("longitude" , "-94.805");
        places1[4] = location;
        ////////////////////////////////////////////////////////////////////////////////
        places2 = new HashMap[4];
        location = new HashMap<>();
        location.put("name" , "Denver");
        location.put("latitude" , "39.307");
        location.put("longitude" , "-105.513");
        places2[0] = location;

        location = new HashMap<>();
        location.put("name" , "Washington");
        location.put("latitude" , "47.878");
        location.put("longitude" , "-121.333");
        places2[1] = location;

        location = new HashMap<>();
        location.put("name" , "New Mexico");
        location.put("latitude" , "34.936");
        location.put("longitude" , "-107.094");
        places2[2] = location;

        location = new HashMap<>();
        location.put("name" , "Dallas");
        location.put("latitude" , "32.844");
        location.put("longitude" , "-94.988");
        places2[3] = location;
        //////////////////////////////////////////////////////////////////////////////
    }

    @Test
    @DisplayName("Compute Distance Matrix")
    public void testComputeDistanceMatrix(){
        Integer[][] distanceMatrix = new Integer[places.length][places.length];
        Integer[][] expectedDistMatrix = {{0, 7011, 59}, {7011, 0, 7006}, {59, 7006, 0}};
        distanceMatrix = optPlaces.createDistanceMatrix(places, options, distanceMatrix);
        assertEquals(Arrays.deepToString(expectedDistMatrix), Arrays.deepToString(distanceMatrix));
    }

    @Test
    @DisplayName("Create Tour (Places indx 2)")
    public void testCreateTourPlaces(){
        Integer[] tour = new Integer[places.length];
        Boolean[] visitedArr = new Boolean[places.length];
        Integer[] expectedTour = {2,0,1};
        Integer[][] expectedDistMatrix = {{0, 7011, 59}, {7011, 0, 7006}, {59, 7006, 0}};
        tour =  optPlaces.createTour(2, expectedDistMatrix, places, visitedArr, tour);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    @DisplayName("Create Tour (Places indx 0)")
    public void testCreateTourPlaces1(){
        Integer[] tour = new Integer[places1.length];
        Boolean[] visitedArr = new Boolean[places1.length];
        Integer[] expectedTour = {0,3,2,1,4};
        Integer[][] distanceMatrix = new Integer[places1.length][places1.length];
        Integer[][] expectedDistMatrix = Optimization.createDistanceMatrix(places1, options, distanceMatrix);
        tour =  optPlaces1.createTour(0, expectedDistMatrix, places1, visitedArr, tour);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    @DisplayName("Total Distance")
    public void testTotalDistancePlaces(){
        Integer[] tour = {0,1,2};
        Long calculatedDistance;
        calculatedDistance =  optPlaces.totalDistance(tour, places, options);
        assertEquals(14076,calculatedDistance);
        Integer [] tour1 = {0,1,2,3,4};
        calculatedDistance = optPlaces1.totalDistance(tour1, places1, options);
        assertEquals(2660, calculatedDistance);
    }

    @Test
    @DisplayName("Nearest Neighbor")
    public void testNearestNeighbor() {
        Map<String, String>[] dist = optPlaces1.nearestNeighbor(this.places1, this.options);
        assertEquals("FOCO", dist[0].get("name"));
        assertEquals("Otis", dist[1].get("name"));
        assertEquals("Colby", dist[2].get("name"));
        assertEquals("Wichita", dist[3].get("name"));
        assertEquals("Galveston", dist[4].get("name"));

        Map<String, String>[] dist1 = optPlaces.nearestNeighbor(this.places, this.options);
        assertEquals("Denver", dist1[0].get("name"));
        assertEquals("Fort Collins", dist1[1].get("name"));
        assertEquals("Center Of Map", dist1[2].get("name"));
    }

    @Test
    @DisplayName("Create Tour (Places indx 2)")
    public void testContains(){
        Boolean expected;
        Boolean expected1;
        Boolean[] contains = {false, false, false};
        expected = optPlaces1.contains(contains, false);
        expected1 = optPlaces1.contains(contains, true);
        assertEquals(true, expected);
        assertEquals(false, expected1);
    }

    @Test
    @DisplayName("Create Tour (Places1 indx 4)")
    public void testCreateTourPlaces1Reverse(){
        Integer[] tour = new Integer[places1.length];
        Boolean[] visitedArr = new Boolean[places1.length];
        Integer[] expectedTour = {4,1,2,3,0};
        Integer[][] distanceMatrix = new Integer[places1.length][places1.length];
        Integer[][] expectedDistMatrix = Optimization.createDistanceMatrix(places1, options, distanceMatrix);
        tour =  optPlaces1.createTour(4, expectedDistMatrix, places1, visitedArr, tour);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    @DisplayName("Create Tour (Places1 indx 2)")
    public void testCreateTourPlaces1Start2(){
        Integer[] tour = new Integer[places1.length];
        Boolean[] visitedArr = new Boolean[places1.length];
        Integer[] expectedTour = {2,3,0,1,4};
        Integer[][] distanceMatrix = new Integer[places1.length][places1.length];
        Integer[][] expectedDistMatrix = Optimization.createDistanceMatrix(places1, options, distanceMatrix);
        tour =  optPlaces1.createTour(2, expectedDistMatrix, places1, visitedArr, tour);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    @DisplayName("Nearest Neighbor 2")
    public void testNeighbor() {
        Integer[] tour = new Integer[places2.length];
        Boolean[] visitedArr = new Boolean[places2.length];
        Integer[][] distanceMatrix = new Integer[places2.length][places2.length];
        Integer[][] expectedDistMatrix = Optimization.createDistanceMatrix(places2, options, distanceMatrix);
        Integer tour0[] = optPlaces2.createTour(0, expectedDistMatrix, places2, visitedArr, tour);
        Integer expected0[] = {0, 2, 3, 1};
        assertEquals(Arrays.deepToString(expected0),Arrays.deepToString(tour0));
        Integer tour1[] = optPlaces2.createTour(1, expectedDistMatrix, places2, visitedArr, tour);
        Integer expected1[] = {1, 0, 2, 3};
        assertEquals(Arrays.deepToString(expected1),Arrays.deepToString(tour1));
        Integer tour2[] = optPlaces2.createTour(2, expectedDistMatrix, places2, visitedArr, tour);
        Integer expected2[] = {2, 0, 3, 1};
        assertEquals(Arrays.deepToString(expected2),Arrays.deepToString(tour2));
        Integer tour3[] = optPlaces2.createTour(3, expectedDistMatrix, places2, visitedArr, tour);
        Integer expected3[] = {3, 2, 0, 1};
        assertEquals(Arrays.deepToString(expected3),Arrays.deepToString(tour3));
    }

    @Test
    @DisplayName("Testing Total Distance")
    public void testDist() {
        Integer[] tour = new Integer[places2.length];
        Boolean[] visitedArr = new Boolean[places2.length];
        Integer[][] distanceMatrix = new Integer[places2.length][places2.length];
        Integer[][] expectedDistMatrix = Optimization.createDistanceMatrix(places2, options, distanceMatrix);
        Integer tour0[] = optPlaces2.createTour(0, expectedDistMatrix, places2, visitedArr, tour);
        Long dist0 = optPlaces2.totalDistance(tour0, places2, options);
        assertEquals(3728, dist0);
        Integer tour1[] = optPlaces2.createTour(1, expectedDistMatrix, places2, visitedArr, tour);
        Long dist1 = optPlaces2.totalDistance(tour1, places2, options);
        assertEquals(3728, dist1);
        Integer tour2[] = optPlaces2.createTour(2, expectedDistMatrix, places2, visitedArr, tour);
        Long dist2 = optPlaces2.totalDistance(tour2, places2, options);
        assertEquals(3926, dist2);
        Integer tour3[] = optPlaces2.createTour(3, expectedDistMatrix, places2, visitedArr, tour);
        Long dist3 = optPlaces2.totalDistance(tour3, places2, options);
        assertEquals(3728, dist3);
    }

    @Test
    @DisplayName("Testing Reorder Places")
    public void testReorderPlaces() {
        Integer indices[] = new Integer[] {0,2,1};
        Map<String, String>[] temp = Optimization.reorderPlaces(indices, places);
        assertEquals("Denver", temp[0].get("name"));
        assertEquals("Fort Collins", temp[1].get("name"));
        assertEquals("Center Of Map", temp[2].get("name"));
    }
}
