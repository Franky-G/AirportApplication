package com.tco.misc;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Optimization {

    public static Map<String, String>[] nearestNeighbor(Map<String, String>[] places, Map<String, String> options) {
        Long startTimer = System.currentTimeMillis();
        Boolean[] visitedArr = new Boolean[places.length];
        Integer[] tour = new Integer[places.length];
        Integer[][] distances = new Integer[places.length][places.length];
        distances = createDistanceMatrix(places, options, distances);
        Long best = Long.MAX_VALUE;
        Long tempDist;
        Integer[] tourTemp;
        Integer[] tourBest = new Integer[places.length];
        for (int i = 0; i < places.length; i++) {
            tourTemp = createTour(i, distances, places, visitedArr, tour);
            tempDist = totalDistance(tourTemp, places, options);
            if (tempDist < best) {
                tourBest = tourTemp;
                best = tempDist;
            }
        }
        Long totalTime = System.currentTimeMillis() - startTimer;
        if(totalTime < (Double.parseDouble(options.get("response"))*1000)){
            tourBest = TwoOpt(distances, tourBest);
        }
        Map<String, String>[] placesTemp = reorderPlaces(tourBest, places);
        return placesTemp;
    }

    public static Integer[][] createDistanceMatrix(Map<String, String>[] places, Map<String, String> options, Integer[][] distances) {
        for (int i = 0; i < places.length; ++i) {
            for (int j = i; j < places.length; ++j) {
                distances[i][j] = Math.toIntExact(CalculateDistance.ComputeDistance(places[i], places[j], Double.valueOf(options.get("earthRadius"))));
                distances[j][i] = distances[i][j];
            }
        }
        return distances;
    }

    public static Integer[] createTour(int startIndex, Integer[][] distances, Map<String, String>[] places, Boolean[] visitedArr, Integer[] tour){
        visitedArr = new Boolean[places.length];
        Arrays.fill(visitedArr, false);
        tour = new Integer[places.length];
        tour[0] = startIndex;
        visitedArr[startIndex] = true;
        int closestPlace = 0;
        int currentPlace = startIndex;
        int counterIndex = 0;
        while(contains(visitedArr, false)) {
            int minDist = Integer.MAX_VALUE;
            for(int col = 0; col < places.length; col++) {
                if (distances[currentPlace][col] < minDist && !visitedArr[col] && distances[currentPlace][col] != 0) {
                    closestPlace = col;
                    minDist = distances[currentPlace][col];
                }
            }
            counterIndex++;
            visitedArr[closestPlace] = true;
            currentPlace = closestPlace;
            tour[counterIndex] = currentPlace;
        }
        return tour;
    }

    public static boolean contains(Boolean[] boolArr, boolean t){
        boolean result = false;
        for(Boolean i : boolArr){
            if(i == t){
                result = true;
                break;
            }
        }
        return result;
    }

    public static Long totalDistance(Integer[] tourTemp, Map<String, String>[] places, Map<String, String> options) {
        Long tempDist[] = new Long[places.length];
        Long tempTotalDist = 0L;
        if (tourTemp.length == 0) {
            tempDist = new Long[tourTemp.length];
        }
        else {
            for (int i = 0; i < tourTemp.length - 1; i++) {
                tempDist[i] = CalculateDistance.ComputeDistance(places[tourTemp[i]], places[tourTemp[i+1]], Double.parseDouble(options.get("earthRadius")));
                tempTotalDist += tempDist[i];
            }
            tempDist[tourTemp.length - 1] = CalculateDistance.ComputeDistance(places[tourTemp[tourTemp.length-1]], places[tourTemp[0]], Double.parseDouble(options.get("earthRadius")));
            tempTotalDist += tempDist[tourTemp.length - 1];
        }
        return tempTotalDist;
    }

    public static Map<String, String>[] reorderPlaces(Integer[] indices, Map<String, String>[] places) {
        Map<String, String>[] reorder = new HashMap[places.length];
        for (int i = 0; i < places.length; i++) {
            reorder[i] = new HashMap<>();
            reorder[i].putAll(places[indices[i]]);
        }
        return reorder;
    }

    private static void TwoOptReverse(Integer[] places, int i1, int k) {
        while(i1 < k) {
            Integer temp = places[i1];
            places[i1] = places[k];
            places[k] = temp;
            i1++;
            k--;
        }
    }

    public static Integer[] makeArray(Integer[] arr, int length) {
        Integer[] ret = new Integer[length];
        for (int i = 0; i < length; i++) {
            if (i >= arr.length) {
                ret[i] = arr[0];
            } else {
                ret[i] = arr[i];
            }
        }
        return ret;
    }

    public static Integer[] TwoOpt(Integer[][] distances, Integer[] myTour) {
        int n = myTour.length;
        Integer[] tour = makeArray(myTour, n+1);
        boolean improvement = true;
        Integer distDelta;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n-3; i++) {
                for (int k = i+2; k <= n-1; k++) {
                    distDelta = (distances[tour[i]][tour[k]] + distances[tour[i+1]][tour[k+1]])-(distances[tour[i]][tour[i+1]] + distances[tour[k]][tour[k+1]]);
                    if (distDelta < 0) {
                        TwoOptReverse(tour, i+1, k);
                        improvement = true;
                    }
                }
            }
        }
        myTour = makeArray(tour, n);
        return myTour;
    }
}