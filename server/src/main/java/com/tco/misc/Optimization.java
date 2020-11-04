package com.tco.misc;
import com.sun.org.apache.xpath.internal.operations.Bool;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Optimization {
    Map<String, String>[] places;
    Map<String, String> options;
    Integer[][] distances;
    Boolean[] visitedArr;
    Map<String, String>[] tour;

    public Optimization(Map<String, String>[] places, Map<String, String> options){
        this.places = new HashMap[places.length];
        this.places = places;
        this.options = new HashMap<>();
        this.options = options;
        this.distances = new Integer[places.length][places.length];
        this.distances = createDistanceMatrix();
        this.visitedArr = new Boolean[places.length];
        Arrays.fill(visitedArr, false);
        this.tour = new HashMap[places.length];
    }

    public Integer[][] createDistanceMatrix(){
        for (int i = 0; i < places.length; ++i) {
            for (int j = i; j < places.length; ++j) {
                distances[i][j] = Math.toIntExact(CalculateDistance.ComputeDistance(places[i], places[j], Double.valueOf(options.get("earthRadius"))));
                distances[j][i] = distances[i][j];
            }
        }
        return distances;
    }


    public Map<String, String>[] createTour(int startIndex){
        tour[startIndex] = places[startIndex];
        visitedArr[startIndex] = true;
        int minDist = 999999999;
        int minCol = 0;
        int minRow = startIndex;
        while(contains(visitedArr, false)) {
            for(int col = 0; col < places.length; col++) {
                if (distances[minRow][col] < minDist && !visitedArr[col] && distances[minRow][col] != 0) {
                    minCol = col;
                    minDist = distances[minRow][col];
                }
            }
            visitedArr[minCol] = true;
            minRow = minCol;
            //append place to tour
        }
        return tour;
    }

    public boolean contains(Boolean[] boolArr, boolean t){
            boolean result = false;
            for(Boolean i : boolArr){
                if(i == t){
                    result = true;
                    break;
                }
            }
            return result;
    }

    public Integer[][] getDistances(){
        return this.distances;
    }

    private static void TwoOptReverse(Map<String, String>[] places, int i1, int k) {
        while(i1 < k) {
            Map<String, String> temp = places[i1];
            places[i1] = places[k];
            places[k] = temp;
            i1++;
            k--;
        }
    }

    public static Map<String, String>[] TwoOpt(Map<String, String>[] places, Map<String, String> options) {
        Integer tour[] = new Integer[places.length];
        Boolean unvisited[] = new Boolean[places.length];
        Integer distances[][] = new Integer[places.length][places.length];
        for (int i = 0; i < places.length; ++i) {
            for (int j = i; j < places.length; ++j) {
                distances[i][j] = Math.toIntExact(CalculateDistance.ComputeDistance(places[i], places[j], Double.valueOf(options.get("earthRadius"))));
                distances[j][i] = distances[i][j];
            }
        }
        for (int i = 0; i < places.length; ++i) {
            tour[i] = i;
            unvisited[i] = true;
        }

        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= places.length-3; i++) {
                for (int k = i+2; k <= places.length-1; k++) {
                    Integer distDelta = (distances[i][k] + distances[i+1][k+1])-(distances[i+1][i]+distances[k][k+1]);
                    if (distDelta < 0) {
                        TwoOptReverse(places, i+1, k);
                        improvement = true;
                    }
                }
            }
        }

        return places;
    }

}