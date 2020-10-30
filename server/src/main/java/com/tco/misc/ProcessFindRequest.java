package com.tco.misc;
import java.sql.*;
import java.util.*;

public class ProcessFindRequest {
    private static String QUERY, matcher, db_url, db_user, db_pass;

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

    private static String setMatch(String matchPattern) {
        if (matchPattern == null){ return ""; }
        StringBuilder temp = new StringBuilder();
        for (int i=0; i<matchPattern.length(); i++){
            char c = matchPattern.charAt(i);
            if (!Character.isDigit(c) && !Character.isLetter(c) && Character.isSpaceChar(c)){ c = '_'; }
            temp.append(c);
        }
        return temp.toString();
    }

    public static void setQUERY(String matchPattern, int limitInt, boolean isPlaces, boolean isFound){
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

    public static List<LinkedHashMap<String,String>> processPlaces(String matchPattern, int limitInt, Map<String,String[]> narrowFilter) {
        List<LinkedHashMap<String, String>> allLocations = new ArrayList<>();
        matcher = setMatch(matchPattern);
        setQUERY(matcher, limitInt, true, false);
        setServerParameters();
        try { runQuery(QUERY, allLocations); }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        if (!narrowFilter.isEmpty()) { filterList(allLocations, narrowFilter, false); }
        return allLocations;
    }

    public static int processFound(String matchPattern, int limitInt, Map<String,String[]> narrowFilter){
        List<LinkedHashMap<String,String>> foundList = new ArrayList<>();
        matcher = setMatch(matchPattern);
        setQUERY(matcher, limitInt, false, true);
        setServerParameters();
        try { runQuery(QUERY, foundList); }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        if (!narrowFilter.isEmpty()) { filterList(foundList, narrowFilter, true); }
        return foundList.size();
    }

    public static void runQuery(String QUERY, List<LinkedHashMap<String, String>> list) throws SQLException {
        Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
        Statement query = con.createStatement();
        ResultSet result = query.executeQuery(QUERY);
        while(result.next()) { list.add(getHashMap(result)); }
        result.close();
        query.close();
        con.close();
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

    private static void filterList(List<LinkedHashMap<String,String>> list, Map<String, String[]> narrowFilter, boolean isFound) {
        String[] countries = narrowFilter.get("where");
        String[] diffPorts = narrowFilter.get("type");
        List<LinkedHashMap<String,String>> placeHolder = new ArrayList<>(list);
        list.clear();

        if (!isFound) {
            placesFilter(placeHolder, list, countries, diffPorts);
        }
//        else{
//            foundFilter
//        }
    }

    public static void placesFilter(List<LinkedHashMap<String,String>> placeHolder, List<LinkedHashMap<String,String>> list, String[] countries, String[] diffPorts){
        for (LinkedHashMap<String, String> resultPlace : placeHolder) {
            String resultCountry = resultPlace.get("country");
            String resultType = resultPlace.get("type");
            if (countries != null && diffPorts == null) { // Only where specified
                onlyWhere(list, resultPlace, countries, resultCountry);
            } else if (countries == null && diffPorts != null) { // Only type specified
                onlyType(list, resultPlace, diffPorts, resultType);
            } else { // Both specified
                bothKeys(list, resultPlace, countries, diffPorts);
            }
        }
    }

    public static void onlyWhere(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String[] countries, String resultCountry){
        if (Arrays.asList(countries).contains(resultCountry)) {
            list.add(resultPlace);
        }
    }

    public static void onlyType(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String[] diffPorts, String resultType){
        onlyTypeHelper(list, resultPlace, resultType, Arrays.asList(diffPorts).contains("airport"));
    }

    public static void onlyTypeHelper(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String resultType, boolean conAir){
        if ((resultPlace.get("type").endsWith("airport") || Objects.equals(resultPlace.get("type"), resultType)) && conAir){
            list.add(resultPlace);
        }
        if (Objects.equals(resultPlace.get("type"), resultType) && !conAir){
            list.add(resultPlace);
        }
    }

    public static void bothKeys(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String[] countries, String[] diffPorts){
        if (Arrays.asList(diffPorts).contains("airport")) {
            BKHelperHas(list, resultPlace, countries, diffPorts);
        }
        else{
            BKHelperNo(list, resultPlace, countries, diffPorts);
        }
    }

    public static void BKHelperHas(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String[] countries, String[] diffPorts){
        if ((resultPlace.get("type").endsWith("airport") || Arrays.asList(diffPorts).contains(resultPlace.get("type"))) && Arrays.asList(countries).contains(resultPlace.get("country"))){
            list.add(resultPlace);
        }
    }

    public static void BKHelperNo(List<LinkedHashMap<String,String>> list, LinkedHashMap<String,String> resultPlace, String[] countries, String[] diffPorts){
        if (Arrays.asList(diffPorts).contains(resultPlace.get("type")) && Arrays.asList(countries).contains(resultPlace.get("country"))){
            list.add(resultPlace);
        }
    }

    public static String[] getCountries() {
        String[] where = new String[0];
        String QUERYcountries = "SELECT name from country;";
        setServerParameters();
        try (
             Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
             Statement query = con.createStatement();
             ResultSet result = query.executeQuery(QUERYcountries)
             )
        {
            List<String> temp = new ArrayList<>();
            while(result.next()) {
                temp.add(result.getString("name"));
            }
            where = new String[temp.size()];
            where = temp.toArray(where);
            return where;
        }
        catch (Exception e) {
            System.err.println("Exception: Can't Connect To Data Base.");
        }
        return where;
    }
}