package com.tco.misc;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ProcessFindRequest {

    private String QUERY;
    private static String db_url;
    private static String db_user;
    private static String db_pass;

    private List<HashMap<String,String>> allLocations = new ArrayList<>();

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

    public List<HashMap<String,String>> processFindServerRequest(String matchPattern, int limitInt)
    {
        setServerParameters();

        try
        {
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();

            if (limitInt == 0){

                this.QUERY = "select name,latitude,longitude from world where name like '" + matchPattern + "' order by name limit 150";
            }
            else if (limitInt > 0){

                this.QUERY = "select name,latitude,longitude from world where name like '" + matchPattern + "' order by name limit " + Integer.toString(limitInt);
            }

            ResultSet result = query.executeQuery(QUERY);

            while(result.next())
            {
                HashMap<String, String> location = new HashMap<>();
                location.put("name", result.getString("name"));
                location.put("latitude", result.getString("latitude"));
                location.put("longitude", result.getString("longitude"));
                this.allLocations.add(location);

            }
        }
        catch (Exception e)
        {
            System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage());
        }
        return allLocations;
    }
}
