package com.tco.misc;
import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class ProcessFindRequest {
    private static String QUERY, db_url, db_user, db_pass;

    public static void setServerParameters() {
        String hasTravis = System.getenv("TRAVIS");
        String hasTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

        if (hasTravis != null && hasTravis.equals("true")) { // In Travis
            db_url = "jdbc:mysql://127.0.0.1/cs314";
            db_user = "root";
            db_pass = null;
        }
        else if (hasTunnel != null && hasTunnel.equals("true")) { // ANY PC not on CSU network
            db_url = "jdbc:mysql://127.0.0.1:56247/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        }
        else {
            db_url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        }
    }

    public static List<LinkedHashMap<String,String>> processPlaces(String matchPattern, int limitInt) {
        List<LinkedHashMap<String, String>> allLocations = new ArrayList<>();
        setQUERY(matchPattern, limitInt, true, false);
        setServerParameters();
        try { runQuery(QUERY, allLocations); }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        return allLocations;
    }

    public static int processFound(String matchPattern, int limitInt){
        List<LinkedHashMap<String,String>> foundList = new ArrayList<>();
        setQUERY(matchPattern, limitInt, false, true);
        setServerParameters();
        try { runQuery(QUERY, foundList); }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        return foundList.size();
    }

    public static void setQUERY(String matchPattern, int limitInt, boolean isPlaces, boolean isFound){
        if (matchPattern == null){ matchPattern = ""; }
        QUERY = "SELECT world.name AS name, world.latitude AS latitude, world.longitude AS longitude, world.id AS id, world.altitude AS altitude, world.municipality AS municipality, world.type AS type, region.name AS region, country.name AS country FROM continent INNER JOIN country ON continent.id = country.continent INNER JOIN region ON country.id = region.iso_country INNER JOIN world on region.id = world.iso_region ";
        if (matchPattern.isEmpty() && limitInt == 0) { QUERY += "ORDER BY RAND() LIMIT 1"; }
        else if (matchPattern.isEmpty()) { QUERY += "ORDER BY RAND() LIMIT " + limitInt; }
        else {
            QUERY += "WHERE country.name LIKE '%" + matchPattern + "%' OR region.name like '%" + matchPattern + "%' OR world.name like '%" + matchPattern + "%' OR world.municipality like '%" + matchPattern + "%' ORDER BY world.name ASC LIMIT ";
            setQUERYHelper(limitInt, isPlaces, isFound);
        }
    }

    public static void setQUERYHelper(int limitInt, boolean isPlaces, boolean isFound){
        if ((!isPlaces && isFound) || (isPlaces && !isFound && limitInt == 0)){ QUERY += "150"; }
        else{ QUERY += limitInt; }
    }

    public static LinkedHashMap<String,String> getHashMap(ResultSet result) throws SQLException {
        LinkedHashMap<String, String> location = new LinkedHashMap<>();
        location.put("name", result.getString("name"));
        location.put("latitude", result.getString("latitude"));
        location.put("longitude", result.getString("longitude"));
        location.put("id", result.getString("id"));
        location.put("altitude", result.getString("altitude"));
        location.put("municipality", result.getString("municipality"));
        location.put("type", result.getString("type"));
        location.put("region", result.getString("region"));
        location.put("country", result.getString("country"));

        String idString = location.get("id");
        location.put("url", "https://www.aopa.org/destinations/airports/" + idString + "/details");
        return location;
    }

    public static void runQuery(String QUERY, List<LinkedHashMap<String, String>> list) throws SQLException {
        Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
        Statement query = con.createStatement();
        ResultSet result = query.executeQuery(QUERY);
        while(result.next()) { list.add(getHashMap(result)); }
    }
}