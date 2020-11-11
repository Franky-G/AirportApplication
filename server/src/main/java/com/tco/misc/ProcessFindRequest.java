package com.tco.misc;
import javax.xml.transform.Result;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public class ProcessFindRequest {
    private static String QUERY, QUERY1, matcher, db_url, db_user, db_pass;
    private static String helper1 = "FROM (SELECT world.name AS name, world.latitude AS latitude, world.longitude AS longitude, world.id AS id, " +
                                    "world.altitude AS altitude, world.municipality AS municipality, world.type AS type, region.name AS region, country.name AS country " +
                                    "FROM continent INNER JOIN country ON continent.id = country.continent  INNER JOIN region ON country.id = region.iso_country " +
                                    "INNER JOIN world ON region.id = world.iso_region";
    private static String helper2 = " ORDER BY tbl.name";

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

    public static String checkMatchHelper(String temp, char c){
        if (!Character.isDigit(c) && !Character.isLetter(c) && !Character.isSpaceChar(c)){
            c = '_';
        }
        temp += c;
        return temp;
    }

    public static String checkMatch(String match){
        if (match == null || match.equals("78LuckyBoy78")){ return ""; }
        String temp = "";
        for (int i=0; i<match.length(); i++){
            temp = checkMatchHelper(temp, match.charAt(i));
        }
        return temp;
    }

    public static void filterQUERYHelper(int limit){
        if (limit > 0){ QUERY += " ASC LIMIT " + limit; }
    }

    public static void filterQUERY(String match, int limit, Map<String, String[]> narrow) {
        QUERY = "SELECT * " + helper1;
        QUERY1 = "SELECT count(*) AS found " + helper1;
        String temp = " WHERE country.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%') AS tbl";
        if (narrow.isEmpty()) { narrowEmpty(match, limit, temp); }
        else { narrowHas(match, limit, narrow, temp); }
    }

    public static void narrowEmpty(String match, int limit, String temp){
        QUERY1 += temp + helper2;
        if (match.isEmpty() && limit == 0) { QUERY += ") AS tbl ORDER BY RAND() LIMIT 1"; }
        else if (match.isEmpty()) { QUERY += ") AS tbl ORDER BY RAND() LIMIT " + limit; }
        else{
            QUERY += temp + helper2;
            filterQUERYHelper(limit);
        }
    }

    public static void narrowHas(String match, int limit, Map<String,String[]> narrow, String temp){
        String typer = typeBuilder(getList(narrow.get("type")));
        String wherer = getList(narrow.get("where")).stream().map(s -> "'" + s + "'").collect(Collectors.joining(", ", "(", ")"));
        QUERY1 += temp;
        narrowHasHelper(narrow, typer, wherer, temp);
        filterQUERYHelper(limit);
    }

    public static void narrowHasHelper(Map<String,String[]> narrow, String typer, String wherer, String temp){
        List<String> types = getList(narrow.get("type"));
        List<String> wheres = getList(narrow.get("where"));
        if (narrow.get("type") != null && narrow.get("where") == null) { onlyType(types, typer, temp); } // Only Type Specified
        else if (narrow.get("where") != null && narrow.get("type") == null){ onlyWhere(wherer, temp); } // Only Where Specified
        else { hasBoth(types, wherer, typer, temp); } // Both Specified
    }

    public static List<String> getList(String[] arr){
        List<String> temp;
        if (arr != null){ temp = Arrays.asList(arr); }
        else{ temp = Collections.singletonList(""); }
        return temp;
    }

    public static String typeBuilder(List<String> types) {
        return types.stream().map(s -> {
            if (s.equals("airport")){ return "'small_airport', 'medium_airport', 'large_airport'"; }
            return "'" + s + "'";
        }).collect(Collectors.joining(", ", "(", ")"));
    }

    public static void onlyType(List<String> types, String typer, String temp){
        if (types.contains("balloonport") || types.contains("heliport") || types.contains("airport")) {
            String temp1 = " WHERE tbl.type IN " + typer;
            QUERY += temp + temp1 +  " ORDER BY tbl.name";
            QUERY1 += temp1 + " ORDER BY tbl.name";
        }
    }

    public static void onlyWhere(String wherer, String temp){
        String temp1 = " WHERE (tbl.country IN " + wherer + " OR tbl.region IN " + wherer + " OR tbl.municipality IN " + wherer + ")";
        QUERY += temp + temp1 + " ORDER BY tbl.name";
        QUERY1 += temp1 + " ORDER BY tbl.name";
    }

    public static void hasBoth(List<String> types, String wherer, String typer, String temp){
        if (types.contains("balloonport") || types.contains("heliport") || types.contains("airport")) {
            String temp1 = " WHERE (tbl.type IN " + typer + ") AND (tbl.country IN " + wherer + " OR tbl.region IN " + wherer + " OR tbl.municipality IN " + wherer + ")";
            QUERY += temp + temp1 + "ORDER BY tbl.name";
            QUERY1 += temp1 + "ORDER BY tbl.name";
        }
    }

    public static List<LinkedHashMap<String, String>> processPlaces(String match, int limit, Map<String, String[]> narrow) {
        if (narrow == null){ narrow = Collections.emptyMap(); }
        int counter = 0;
        List<LinkedHashMap<String,String>> allLocations = new ArrayList<>();
        matcher = checkMatch(match);
        filterQUERY(matcher, limit, narrow);
        setServerParameters();
        try{ runPlacesQuery(counter, allLocations); }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        return allLocations;
    }

    public static void runPlacesQuery(int counter, List<LinkedHashMap<String,String>> allLocations) throws SQLException {
        Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
        Statement query = con.createStatement();
        ResultSet result = query.executeQuery(QUERY);
        while (result.next() && counter < 500){
            allLocations.add(processPlacesHelper(result));
            counter++;
        }
    }

    public static LinkedHashMap<String, String> processPlacesHelper(ResultSet result) throws SQLException {
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
        if (idString != null){ location.put("url", "https://www.aopa.org/destinations/airports/" + idString + "/details"); }
        return location;
    }

    public static int processFound(String match, int limit){
        matcher = checkMatch(match);
        LinkedHashMap<String,String> foundMap = new LinkedHashMap<>();
        try{
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            ResultSet result = query.executeQuery(QUERY1);
            while (result.next()){ foundMap.put("found", result.getString("found")); }
        }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        int found = Integer.parseInt(foundMap.get("found"));
        return foundReturn(matcher, limit, found);
    }

    public static int foundReturn(String match, int limit, int found){
        if (match.isEmpty() && limit == 0){ return 1; }
        if (match.isEmpty()){ return limit; }
        else{ return found; }
    }


    public static String[] getWhere() {
        String[] where = new String[0];
        String QUERYcountries = "SELECT name AS name FROM country ORDER BY name";
        String QUERYregion = "SELECT name AS name FROM region ORDER BY name";
        String QUERYmunicipality = "SELECT distinct(municipality) AS name FROM continent INNER JOIN country ON continent.id = country.continent INNER JOIN region ON country.id = region.iso_country INNER JOIN world ON region.id = world.iso_region order by municipality";
        setServerParameters();
        try (
             Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
             Statement query = con.createStatement();
             ResultSet result = query.executeQuery(QUERYcountries);
             ResultSet result1 = query.executeQuery(QUERYregion);
             ResultSet result2 = query.executeQuery(QUERYmunicipality)
             )
        {
            List<String> temp = new ArrayList<>();
            getWhereHelper(temp, result);
            getWhereHelper(temp, result1);
            getWhereHelper(temp, result2);
            where = new String[temp.size()];
            where = temp.toArray(where);
            return where;
        }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base."); }
        return where;
    }

    public static void getWhereHelper(List<String> temp, ResultSet result) throws SQLException {
        while (result.next()){
            if (result.getString("name") != null) { temp.add(result.getString("name")); }
        }
    }
}