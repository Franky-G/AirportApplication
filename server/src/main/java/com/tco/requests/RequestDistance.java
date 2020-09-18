package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class RequestDistance extends RequestHeader {

    private Map <String,String> place1;
    private Map <String,String> place2;
    private Float earthRadius;
    private Integer distance;
    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    public RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestDistance(Float radius, String latplace1, String longplace1, String latplace2, String longplace2) {
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

    public Integer computeDistance() {
        Double latplace1 = ((Double.valueOf(place1.get("latitude"))).doubleValue()) * Math.PI/180;
        Double longplace1 = ((Double.valueOf(place1.get("longitude"))).doubleValue()) * Math.PI/180;
        Double latplace2 = ((Double.valueOf(place2.get("latitude"))).doubleValue()) * Math.PI/180;
        Double longplace2 = ((Double.valueOf(place2.get("longitude"))).doubleValue()) * Math.PI/180;
        Double similar = Math.cos(Math.abs(longplace1 - longplace2));
        Double part1 = Math.pow(Math.cos(latplace2) * Math.sin(Math.abs(longplace1 - longplace2)), 2);
        Double part2 = Math.pow(((Math.cos(latplace1) * Math.sin(latplace2)) - (Math.sin(latplace1) * Math.cos(latplace2) * similar)), 2);
        Double part3 = part1 + part2;
        Double part4 = Math.sqrt(part3);
        Double part5 = Math.sin(latplace1) * Math.sin(latplace2) + Math.cos(latplace1) * Math.cos(latplace2) * similar;
        Double part6 = Math.atan2(part4, part5);
        Integer finalDistance = (int) (this.earthRadius * part6);
        return finalDistance;
    }

    @Override
    public void buildResponse() {
        this.distance = this.computeDistance();
        log.trace("buildResponse -> {}", this);
    }

    public Map<String, String> getPlace1() { return place1; }
    public Map<String, String> getPlace2() { return place2; }
    public Float getEarthRadius() { return earthRadius; }
    public Integer getDistance() { return this.distance; }
}
