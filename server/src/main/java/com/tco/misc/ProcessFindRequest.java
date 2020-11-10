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
        if (match == null || match.equals("78LuckyBoy78")){
            return "";
        }
        String temp = "";
        for (int i=0; i<match.length(); i++){
            temp = checkMatchHelper(temp, match.charAt(i));
        }
        return temp;
    }

    public static void setQUERY() {
        QUERY = "SELECT * " + helper1;
        QUERY1 = "SELECT count(*) AS found " + helper1;
    }

    public static void filterQUERY(String match, int limit, Map<String, String[]> narrow) {

        if (narrow.isEmpty()) {
            narrowEmpty(match, limit);
        }
        else {
            narrowHas(match, limit, narrow);
        }
    }

    public static void narrowEmpty(String match, int limit){
        String temp = " WHERE country.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%') AS tbl";
        QUERY1 += temp + helper2;

        if (match.isEmpty() && limit == 0) {
            QUERY += ") AS tbl ORDER BY RAND() LIMIT 1";
        } else if (match.isEmpty()) {
            QUERY += ") AS tbl ORDER BY RAND() LIMIT " + limit;
        }
        else{
            QUERY += temp + helper2;
            if (limit > 0){
                QUERY += " ASC LIMIT " + limit;
            }
        }

    }

    public static void narrowHas(String match, int limit, Map<String,String[]> narrow){
        String temp = " WHERE country.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR world.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%') AS tbl";

        QUERY1 += temp;

        List<String> types;
        List<String> wheres;
        if (narrow.get("type") != null){
            types = Arrays.asList(narrow.get("type"));
        }
        else{
            types = Collections.singletonList("");
        }
        if (narrow.get("where") != null){
            wheres = Arrays.asList(narrow.get("where"));
        }
        else{
            wheres = Collections.singletonList("");
        }
        String typer = typeBuilder(types);
        String wherer = wheres.stream().map(s -> "'" + s + "'").collect(Collectors.joining(", ", "(", ")"));

        if (narrow.get("type") != null && narrow.get("where") == null) { // Only Type specified
            if (types.contains("balloonport") || types.contains("heliport") || types.contains("airport")) {
                String temp1 = " WHERE tbl.type IN " + typer;
                QUERY += temp + temp1 +  " ORDER BY tbl.name";
                QUERY1 += temp1 + " ORDER BY tbl.name";
                if (limit > 0) {
                    QUERY += " ASC LIMIT " + limit;
                }
            }
        }

        else if (narrow.get("where") != null && narrow.get("type") == null){ // Only Where specified
            String temp1 = " WHERE (tbl.country IN " + wherer + " OR tbl.region IN " + wherer + " OR tbl.municipality IN " + wherer + ")";
            QUERY += temp + temp1 + " ORDER BY tbl.name";
            QUERY1 += temp1 + " ORDER BY tbl.name";
            if (limit > 0){
                QUERY += " ASC LIMIT " + limit;
            }
        }

        else if (wheres.size() > 0 && types.size() > 0){ // Both Specified
            if (types.contains("balloonport") || types.contains("heliport") || types.contains("airport")) {
                String temp1 = " WHERE (tbl.country IN " + wherer + " OR tbl.region IN " + wherer + " OR tbl.municipality IN " + wherer + ") AND (tbl.type IN " + typer + ")";
                QUERY += temp + temp1 + "ORDER BY tbl.name";
                QUERY1 += temp1 + "ORDER BY tbl.name";
                if (limit > 0) {
                    QUERY += " ASC LIMIT " + limit;
                }
            }
        }

    }

    public static String typeBuilder(List<String> types) {

        return types.stream().map(s -> {
            if (s.equals("airport")){
                return "'small_airport', 'medium_airport', 'large_airport'";
            }
            return "'" + s + "'";
        }).collect(Collectors.joining(", ", "(", ")"));
    }

    public static List<LinkedHashMap<String, String>> processPlaces(String match, int limit, Map<String, String[]> narrow) {
        if (narrow == null){ narrow = Collections.emptyMap(); }

        int counter = 0;
        List<LinkedHashMap<String,String>> allLocations = new ArrayList<>();

        matcher = checkMatch(match);
        setQUERY();

        filterQUERY(matcher, limit, narrow);
        setServerParameters();

        try{
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            ResultSet result = query.executeQuery(QUERY);

            while (result.next() && counter < 500){
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
                if (idString != null){
                    location.put("url", "https://www.aopa.org/destinations/airports/" + idString + "/details");
                }
                allLocations.add(location);
                counter++;
            }
        } catch (Exception e) {
            System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage());
        }

        return allLocations;
    }

    public static int processFound(String match, int limit){
        matcher = checkMatch(match);
        LinkedHashMap<String,String> foundMap = new LinkedHashMap<>();

        try{
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            ResultSet result = query.executeQuery(QUERY1);

            while (result.next()){
                foundMap.put("found", result.getString("found"));
            }
        } catch (Exception e) {
            System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage());
        }

        int found = Integer.parseInt(foundMap.get("found"));
        return foundReturn(matcher, limit, found);
    }

    public static int foundReturn(String match, int limit, int found){
        if (match.isEmpty() && limit == 0){
            return 1;
        }
        if (match.isEmpty()){
            return limit;
        }
        else{
            return found;
        }
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
        } catch (Exception e) {
            System.err.println("Exception: Can't Connect To Data Base.");
        }
        return where;
    }

    public static void getWhereHelper(List<String> temp, ResultSet result) throws SQLException {
        while (result.next()){
            if (result.getString("name") != null) {
                temp.add(result.getString("name"));
            }
        }
    }
}