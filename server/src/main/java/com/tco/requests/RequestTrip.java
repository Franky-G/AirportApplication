package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.misc.CalculateDistance;

import java.util.HashMap;
import java.util.Map;

public class RequestTrip extends RequestHeader {

//    private Map<String, String>[] places;
    private HashMap[] places;
    private Map <String, String> options;
    private String title;
    private String earthRadius;
    private Long distance[];
    private CalculateDistance calc = new CalculateDistance();

    public RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestTrip(String title, String earthRadius, HashMap[] places) {
        this();
        this.options = new HashMap<>();
        this.options.put("title", title);
        this.options.put("earthRadius", earthRadius);
        this.title = this.options.get("title");
        this.earthRadius = this.options.get("earthRadius");
        this.places = places;
        this.distance = null;
    }

    @Override
    public void buildResponse() {
        for (int i = 0; i < this.places.length; i++) {
            if (i == places.length - 1) {
                Long tempDist = calc.ComputeDistance(this.places[i], this.places[0], Double.parseDouble(this.earthRadius));
                this.distance[i] = tempDist;
            }
            Long tempDist = calc.ComputeDistance(this.places[i], this.places[i+1], Double.parseDouble(this.earthRadius));
            this.distance[i] = tempDist;
        }
    }

    public Map<String, String>  getOptions() { return this.options; }
    public HashMap[] getPlaces() { return this.places; }
    public String getEarthRadius() {return this.earthRadius; }
    public Long [] getTripDistance() { return this.distance; }
    public String getTitle() { return this.title; }
}
