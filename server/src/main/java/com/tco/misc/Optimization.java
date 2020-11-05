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
        this.visitedArr = new Boolean[places.length];
        Arrays.fill(visitedArr, false);
        this.tour = new Integer[places.length];
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
        Long tempTotalDist;
        if (tourTemp.length == 0) {
            tempDist = new Long[tourTemp.length];
        }
        else {
            for (int i = 0; i < tourTemp.length - 1; i++) {
                tempDist[i] = CalculateDistance.ComputeDistance(this.places[tourTemp[i]], this.places[tourTemp[i+1]], Double.parseDouble(this.options.get("earthRadius")));
            }
            tempDist[tourTemp.length - 1] = CalculateDistance.ComputeDistance(this.places[tourTemp[tourTemp.length-1]], this.places[tourTemp[0]], Double.parseDouble(this.options.get("earthRadius")));
        }
        tempTotalDist = getTotalDist(tempDist);
        return tempTotalDist;
    }

    public Long getTotalDist(Long[] dist) {
        Long tempTotalDist = 0L;
        for (int i = 0; i < dist.length; i++) {
            tempTotalDist += dist[i];
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

    public Integer[] TwoOpt() {
        Integer distances[][] = this.getDistances();
        Integer[] places = new Integer[this.tour.length+1];;
        for (int i = 0; i < places.length-1; i++) {
            places[i] = this.tour[i];
        }
        places[places.length-1] = this.tour[0];
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