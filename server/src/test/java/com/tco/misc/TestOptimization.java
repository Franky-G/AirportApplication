package com.tco.misc;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestOptimization {
    Map<String, String>[] places;
    Map<String, String>[] places1;
    Map<String, String> location;
    Map<String, String> options;

    private Optimization optPlaces;
    private Optimization optPlaces1;

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
        optPlaces = new Optimization(places, options);
        optPlaces1 = new Optimization(places1, options);
    }

    @Test
    public void testComputeDistanceMatrix(){
        Integer[][] distanceMatrix;
        Integer[][] expectedDistMatrix = {{0, 7011, 59}, {7011, 0, 7006}, {59, 7006, 0}};
        distanceMatrix = optPlaces.getDistances();
        assertEquals(Arrays.deepToString(expectedDistMatrix),Arrays.deepToString(distanceMatrix));
    }

    @Test
    public void testCreateTourPlaces(){
        Integer[] tour;
        Integer[] expectedTour = {2,0,1};   //TEST with 3 locations
        tour =  optPlaces.createTour(2);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    public void testCreateTourPlaces1(){
        Integer[] tour;
        Integer[] expectedTour = {0,3,2,1,4};   //TEST with 5 locations
        tour =  optPlaces1.createTour(0);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }

    @Test
    public void testContains(){
        Boolean expected;
        Boolean expected1;
        Boolean[] contains = {false, false, false};
        expected = optPlaces1.contains(contains, false);
        expected1 = optPlaces1.contains(contains, true);
        assertEquals(true, expected);
        assertEquals(false, expected1);
    }

//    @Test
//    public void testTotalDistancePlaces(){
//        Integer[] tour = {0,1,2};
//        Long calculatedDistance;
//        Long expectedDistance = 10L;
//        calculatedDistance =  optPlaces.totalDistance(tour);
//        assertEquals(expectedDistance,calculatedDistance);
//    }
}
