package com.tco.requests;

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
    private Long distances[];
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
        this.places = new HashMap[places.length];
        this.places = places;
        this.distances = new Long[places.length];
    }

    @Override
    public void buildResponse() {
        this.distances = new Long[this.places.length];
        for (int i = 0; i < this.places.length - 1; i++) {
            this.distances[i] = CalculateDistance.ComputeDistance(this.places[i], this.places[i+1], Double.parseDouble(this.options.get("earthRadius")));
        }
        this.distances[this.places.length - 1] = CalculateDistance.ComputeDistance(this.places[this.places.length - 1], this.places[0], Double.parseDouble(this.options.get("earthRadius")));;
        log.trace("buildResponse -> {}", this);
    }

    public Map<String, String>[] getPlaces() { return this.places; }
    public String getEarthRadius() {return this.earthRadius; }
    public Long [] getTripDistance() { return this.distances; }
    public String getTitle() { return this.title; }
}
