package com.tco.requests;

import com.tco.misc.Optimization;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.misc.CalculateDistance;
import java.util.HashMap;
import java.util.Map;

public class RequestTrip extends RequestHeader {

    private Map<String, String>[] places;
    private Map <String, String> options;
    private String title;
    private String earthRadius;
    private String response;
    private Long distances[];
    private String units;
    private Long distanceNN;
    private Optimization opt;
    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    public RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestTrip(Map<String, String> options, Map<String, String>[] places) {
        this();
        this.options = new HashMap<>();
        this.options = options;
        this.title = this.options.get("title");
        this.earthRadius = this.options.get("earthRadius");
        this.units = this.options.get("units");
        this.response = this.options.get("response");
        this.places = new HashMap[places.length];
        this.places = places;
        this.distances = new Long[places.length];
    }

    @Override
    public void buildResponse() {
        if (this.options.get("response") != null && Double.valueOf(this.options.get("response")).doubleValue() > 0.0) {
            this.places = Optimization.nearestNeighbor(this.places, this.options);
            this.distances = calculateDistanceArray(this.places, this.options);
        }
        else {
            this.distances = calculateDistanceArray(this.places, this.options);
        }
        log.trace("buildResponse -> {}", this);
    }

    public Long[] calculateDistanceArray(Map<String, String>[] places, Map<String, String> options) {
        Long[] distanceTemp;
        if (places.length == 0) {
            distanceTemp = new Long[places.length];
        }
        else {
            distanceTemp = new Long[places.length];
            for (int i = 0; i < places.length - 1; i++) {
                distanceTemp[i] = CalculateDistance.ComputeDistance(places[i], places[i+1], Double.parseDouble(options.get("earthRadius")));
            }
            distanceTemp[places.length - 1] = CalculateDistance.ComputeDistance(places[places.length - 1], places[0], Double.parseDouble(options.get("earthRadius")));
        }
        return distanceTemp;
    }

    public Long getTotalTripDistance() {
        Long[] distances = this.getTripDistance();
        Long total = 0L;
        for (Long dist:distances) {
            total = Long.sum(total, dist);
        }
        if (this.places.length == 2) {
            total = Long.sum(total, -1*distances[1]);
        }
        return total;
    }

    public Map<String, String>[] getPlaces() { return this.places; }
    public String getEarthRadius() {return this.earthRadius; }
    public String getResponse() { return this.response; }
    public Long [] getTripDistance() { return this.distances; }
    public String getTitle() { return this.title; }
    public String getUnits() { return this.units; }
}
