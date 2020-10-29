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
    private String response;
    private Long distances[];
    private String units;
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
        if (this.places.length == 0) {
            this.distances = new Long[this.places.length];
        }
        else {
            this.distances = new Long[this.places.length];
            for (int i = 0; i < this.places.length - 1; i++) {
                this.distances[i] = CalculateDistance.ComputeDistance(this.places[i], this.places[i+1], Double.parseDouble(this.options.get("earthRadius")));
            }
            this.distances[this.places.length - 1] = CalculateDistance.ComputeDistance(this.places[this.places.length - 1], this.places[0], Double.parseDouble(this.options.get("earthRadius")));
        }
        log.trace("buildResponse -> {}", this);
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
