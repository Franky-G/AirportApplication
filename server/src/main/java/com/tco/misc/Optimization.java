package com.tco.misc;

import org.mariadb.jdbc.internal.logging.Logger;
import org.mariadb.jdbc.internal.logging.LoggerFactory;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Optimization {
    private Optimization opt;
    Map<String, String>[] places;
    Map<String, String> options;
    Integer[][] distances;
    Boolean[] visitedArr;
    Integer[] tour;
    private final transient Logger log = LoggerFactory.getLogger(Optimization.class);

    public Optimization(Map<String, String>[] places, Map<String, String> options){
        this.places = new HashMap[places.length];
        this.places = places;
        this.options = new HashMap<>();
        this.options = options;
        this.distances = new Integer[places.length][places.length];
        this.distances = createDistanceMatrix();
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

    public Long nearestNeighbor() {
        Long best = Long.MAX_VALUE;
        Long tempDist;
        Integer[] tourTemp;
        for (int i = 0; i < places.length; i++) {
            tourTemp = createTour(i);
            tempDist = totalDistance(tourTemp);
            if (tempDist < best) {
                best = tempDist;
            }
        }
        return best;
    }

    public Integer[] createTour(int startIndex){
        this.visitedArr = new Boolean[places.length];
        Arrays.fill(visitedArr, false);
        this.tour = new Integer[places.length];
        tour[0] = startIndex;
        visitedArr[startIndex] = true;
        int minCol = 0;
        int minRow = startIndex;
        int counterIndex = 0;
        while(contains(visitedArr, false)) {
            int minDist = Integer.MAX_VALUE;
            for(int col = 0; col < places.length; col++) {
                if (distances[minRow][col] < minDist && !visitedArr[col] && distances[minRow][col] != 0) {
                    minCol = col;
                    minDist = distances[minRow][col];
                }
            }
            counterIndex++;
            visitedArr[minCol] = true;
            minRow = minCol;
            tour[counterIndex] = minRow;
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

    public Long totalDistance(Integer[] tourTemp) {
        Long tempDist[] = new Long[this.places.length];
        Long tempTotalDist = 0L;
        if (tourTemp.length == 0) {
            tempDist = new Long[tourTemp.length];
        }
        else {
            for (int i = 0; i < tourTemp.length - 1; i++) {
                tempDist[i] = CalculateDistance.ComputeDistance(this.places[tourTemp[i]], this.places[tourTemp[i+1]], Double.parseDouble(this.options.get("earthRadius")));
                tempTotalDist += tempDist[i];
            }
            tempDist[tourTemp.length - 1] = CalculateDistance.ComputeDistance(this.places[tourTemp[tourTemp.length-1]], this.places[tourTemp[0]], Double.parseDouble(this.options.get("earthRadius")));
            tempTotalDist += tempDist[tourTemp.length - 1];
        }
        return tempTotalDist;
    }

    public Integer[][] getDistances(){
        return this.distances;
    }

    private void TwoOptReverse(Integer[] places, int i1, int k) {
        while(i1 < k) {
            Integer temp = places[i1];
            places[i1] = places[k];
            places[k] = temp;
            i1++;
            k--;
        }
    }

    public Integer[] TwoOpt(int start) {
        Integer[] myTour = this.createTour(start);
        Integer[][] distances = this.getDistances();
        int n = myTour.length;
        Integer[] places = new Integer[myTour.length+1];
        for (int i = 0; i < places.length-1; i++) {
            places[i] = myTour[i];
        }
        places[places.length-1] = myTour[0];
        boolean improvement = true;
        Integer distDelta = 0;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n-3; i++) {
                for (int k = i+2; k <= n-1; k++) {
                    distDelta = (distances[places[i]][places[k]] + distances[places[i+1]][places[k+1]])-(distances[places[i]][places[i+1]] + distances[places[k]][places[k+1]]);
                    if (distDelta < 0) {
                        TwoOptReverse(places, i+1, k);
                        improvement = true;
                    }
                }
            }
        }
        Integer[] ret = new Integer[places.length-1];;
        for (int i = 0; i < places.length-1; i++) {
            ret[i] = places[i];
        }
        return ret;
    }
}