package com.tco.misc;

import java.util.Map;

public class CalculateDistance {

    public static Long ComputeDistance(Map <String, String> place1, Map <String, String> place2, Double earthRadius) {
        if (place1 == null || place2 == null) {
            return Long.valueOf(-1);
        }
        Double latplace1 = Math.toRadians(Double.valueOf(place1.get("latitude")).doubleValue());
        Double longplace1 = Math.toRadians((Double.valueOf(place1.get("longitude"))).doubleValue());
        Double latplace2 = Math.toRadians((Double.valueOf(place2.get("latitude"))).doubleValue());
        Double longplace2 = Math.toRadians((Double.valueOf(place2.get("longitude"))).doubleValue());
        Double similar = Math.cos(Math.abs(longplace1 - longplace2));
        Double part1 = Math.pow(Math.cos(latplace2) * Math.sin(Math.abs(longplace1 - longplace2)), 2);
        Double part2 = Math.pow(((Math.cos(latplace1) * Math.sin(latplace2)) - (Math.sin(latplace1) * Math.cos(latplace2) * similar)), 2);
        Double part3 = part1 + part2;
        Double part4 = Math.sqrt(part3);
        Double part5 = Math.sin(latplace1) * Math.sin(latplace2) + Math.cos(latplace1) * Math.cos(latplace2) * similar;
        Double part6 = Math.atan2(part4, part5);
        Long finalDistance = (long) Math.round(earthRadius * part6);
        return finalDistance;
    }
}
