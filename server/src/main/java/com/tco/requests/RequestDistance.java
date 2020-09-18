package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class RequestDistance extends RequestHeader {

    private Map <String,String> place1;
    private Map <String,String> place2;
    private double earthRadius;
    //private double distance;
    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    public RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public double computeDistance() {
        double latplace1 = (Double.valueOf(place1.get("latitude"))).doubleValue();
        double longplace1 = (Double.valueOf(place1.get("longitude"))).doubleValue();
        double latplace2 = (Double.valueOf(place1.get("latitude"))).doubleValue();
        double longplace2 = (Double.valueOf(place1.get("longitude"))).doubleValue();
        double part1 = Math.pow((Math.cos(latplace2)*Math.sin(Math.abs(longplace1-longplace2))), 2);
        double part2 = Math.pow((Math.cos(latplace1)*Math.sin(latplace2))-(Math.sin(latplace1)*Math.cos(latplace2)*Math.cos(Math.abs(longplace1-longplace2))), 2);
        double part3 = Math.sin(latplace1)*Math.sin(latplace2) + Math.cos(latplace1)*Math.cos(latplace2)*Math.cos(Math.abs(longplace1-longplace2));
        double computedDistance = Math.atan((Math.sqrt(part1+part2))/part3);
        double finalDistance = computedDistance * this.earthRadius;
        return finalDistance;
    }

    @Override
    public void buildResponse() {
        this.earthRadius = 3959.00;
        this.place1 = new HashMap<>();
        this.place2 = new HashMap<>();
        //this.distance = this.computeDistance();
        log.trace("buildResponse -> {}", this);
    }

    public Map<String, String> getPlace1() { return place1; }
    public Map<String, String> getPlace2() { return place2; }
    public double getEarthRadius() { return earthRadius; }
    //public double getDistance() { return this.distance; }
}
