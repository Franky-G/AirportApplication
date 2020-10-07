package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.misc.CalculateDistance;
import java.util.HashMap;
import java.util.Map;

public class RequestDistance extends RequestHeader {

    private Map <String,String> place1;
    private Map <String,String> place2;
    private Double earthRadius;
    private Long distance;
    private CalculateDistance calc = new CalculateDistance();
    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    public RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestDistance(Double radius, String latplace1, String longplace1, String latplace2, String longplace2) {
        this();
        this.distance = null;
        this.earthRadius = radius;
        this.place1 = new HashMap<>();
        this.place1.put("latitude", latplace1);
        this.place1.put("longitude", longplace1);
        this.place2 = new HashMap<>();
        this.place2.put("latitude", latplace2);
        this.place2.put("longitude", longplace2);
    }

    @Override
    public void buildResponse() {
        this.distance = calc.ComputeDistance(this.place1, this.place2, earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    public Map<String, String> getPlace1() { return place1; }
    public Map<String, String> getPlace2() { return place2; }
    public Double getEarthRadius() { return this.earthRadius; }
    public Long getDistance() { return this.distance; }
}
