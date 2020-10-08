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
    private Long distance[];
    private CalculateDistance calc = new CalculateDistance();
    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    public RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestTrip(String title, String earthRadius, Map<String, String>[] places) {
        this();
        this.options = new HashMap<>();
        this.options.put("title", title);
        this.options.put("earthRadius", earthRadius);
        this.title = this.options.get("title");
        this.earthRadius = this.options.get("earthRadius");
        this.places = places;
        this.distance = new Long[this.places.length];
    }

    @Override
    public void buildResponse() {
        for (int i = 0; i < this.places.length; i++) {
            if (i == this.places.length - 1) {
                Long tempDist = calc.ComputeDistance(this.places[i], this.places[0], Double.parseDouble(this.earthRadius));
                this.distance[i] = tempDist;
            }
            else {
                Long tempDist = calc.ComputeDistance(this.places[i], this.places[i+1], Double.parseDouble(this.earthRadius));
                this.distance[i] = tempDist;
            }
        }
        log.trace("buildResponse -> {}", this);
    }

    public Map<String, String>[] getPlaces() { return this.places; }
    public String getEarthRadius() {return this.earthRadius; }
    public Long [] getTripDistance() { return this.distance; }
    public String getTitle() { return this.title; }
}
