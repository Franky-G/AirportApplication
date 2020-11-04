package com.tco.misc;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestOptimization {
    Map<String, String>[] places;
    Map<String, String> location;
    Map<String, String> options;

    private Optimization opt;

    @BeforeEach
    public void testJimit(){
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
        options = new HashMap<>();
        options.put("earthRadius", "3959.0");
        opt = new Optimization(places, options);
    }

    @Test
    public void testComputeDistanceMatrix(){
        Integer[][] distanceMatrix;
        Integer[][] expectedDistMatrix = {{0, 7011, 59}, {7011, 0, 7006}, {59, 7006, 0}};
        distanceMatrix = opt.getDistances();
        assertEquals(Arrays.deepToString(expectedDistMatrix),Arrays.deepToString(distanceMatrix));
    }

    @Test
    public void testCreateTour(){
        Integer[] tour;
        Integer[] expectedTour = {2,0,1};
        tour =  opt.createTour(2);
        assertEquals(Arrays.deepToString(expectedTour),Arrays.deepToString(tour));
    }
}
