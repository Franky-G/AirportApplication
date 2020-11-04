package com.tco.misc;

import java.util.Map;
import com.tco.misc.CalculateDistance;

public class Optimization {

    public static Map<String, String>[] nearestNeighbor(Map<String, String>[] places, Map<String, String> options) {
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
        return places;
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