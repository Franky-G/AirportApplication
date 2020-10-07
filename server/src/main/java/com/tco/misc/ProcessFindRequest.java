package com.tco.misc;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ProcessFindRequest {

    public int foundProcess = 0;

    private String QUERY;
    private static String db_url;
    private static String db_user;
    private static String db_pass;

    private final List<HashMap<String,String>> allLocations = new ArrayList<>();
    private final List<HashMap<String,String>> foundList = new ArrayList<>();

    public static void setServerParameters()
    {
        String hasTravis = System.getenv("TRAVIS");
        String hasTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

        //In Travis
        if (hasTravis != null && hasTravis.equals("true")) {
            db_url = "jdbc:mysql://127.0.0.1/cs314";
            db_user = "root";
            db_pass = null;
        }
        //ANY PC not on CSU network
        else if (hasTunnel != null && hasTunnel.equals("true"))
        {
            db_url = "jdbc:mysql://127.0.0.1:56247/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        }
        //CSU CS machines
        else
        {
            db_url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        }
    }

    public List<HashMap<String,String>> processPlaces(String matchPattern, int limitInt) {
        this.QUERY = getQUERY(matchPattern, limitInt);
        setServerParameters();
        try {
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            if (limitInt == 0 && !matchPattern.isEmpty()){ this.QUERY += Integer.toString(150); }
            else if (limitInt > 0 && !matchPattern.isEmpty()){ this.QUERY += Integer.toString(limitInt); }
            ResultSet result = query.executeQuery(QUERY);
            while(result.next()) {
                HashMap<String, String> location = new HashMap<>();
                location.put("name", result.getString("name"));
                location.put("latitude", result.getString("latitude"));
                location.put("longitude", result.getString("longitude"));
                this.allLocations.add(location); }
        }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        return allLocations;
    }

    public int processFound(String matchPattern, int limitInt){
//        this.QUERY = "SELECT world.name, world.latitude, world.longitude FROM continent INNER JOIN country ON continent.id = country.continent INNER JOIN region ON country.id = region.iso_country INNER JOIN world on region.id = world.iso_region ";
//        if (matchPattern.isEmpty() && limitInt == 0) { this.QUERY += "ORDER BY RAND() LIMIT 1"; }
//        else if (matchPattern.isEmpty()) { this.QUERY += "ORDER BY RAND() LIMIT " + limitInt; }
//        else { this.QUERY += "WHERE country.name LIKE '%" + matchPattern + "%' OR region.name like '%" + matchPattern + "%' OR world.name like '%" + matchPattern + "%' OR world.municipality like '%" + matchPattern + "%' ORDER BY world.name ASC LIMIT 150"; }
        this.QUERY = getQUERY(matchPattern, limitInt);
        setServerParameters();
        try {
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            if (!matchPattern.isEmpty()) { this.QUERY += "150"; }
            ResultSet result = query.executeQuery(QUERY);
            while(result.next()) {
                HashMap<String, String> location = new HashMap<>();
                location.put("name", result.getString("name"));
                location.put("latitude", result.getString("latitude"));
                location.put("longitude", result.getString("longitude"));
                this.foundList.add(location); }
        }
        catch (Exception e) { System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage()); }
        return foundList.size();
    }

    public String getQUERY(String matchPattern, int limitInt){
        this.QUERY = "SELECT world.name, world.latitude, world.longitude FROM continent INNER JOIN country ON continent.id = country.continent INNER JOIN region ON country.id = region.iso_country INNER JOIN world on region.id = world.iso_region ";
        if (matchPattern.isEmpty() && limitInt == 0) { this.QUERY += "ORDER BY RAND() LIMIT 1"; }
        else if (matchPattern.isEmpty() && limitInt != 0) { this.QUERY += "ORDER BY RAND() LIMIT " + limitInt; }
        else { this.QUERY += "WHERE country.name LIKE '%" + matchPattern + "%' OR region.name like '%" + matchPattern + "%' OR world.name like '%" + matchPattern + "%' OR world.municipality like '%" + matchPattern + "%' ORDER BY world.name ASC LIMIT "; }
        return this.QUERY;
    }
}