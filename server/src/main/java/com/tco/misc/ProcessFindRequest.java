package com.tco.misc;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ProcessFindRequest {

    private static ResultSet result;
    private static String db_url;
    private static String db_user;
    private static String db_pass;
    private static String QUERY = "select name,municipality,id,type,latitude,longitude from world where name like 'salt%' order by name limit 5";

    private static HashMap<String, String> location;
    private static HashMap<String, String> itemsFoundMap;

    private static final ArrayList allLocations = new ArrayList<>();

    public static void setServerParameters()
    {
        String hasTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        String hasTravis = System.getenv("TRAVIS");
        /*if (hasTravis != null && hasTravis.equals("true")) {
            db_url = "jdbc:mysql://127.0.0.1/cs314";
            db_user = "root";
            db_pass = null;
        }*/
        //else if (hasTunnel != null && hasTunnel.equals("true"))
        //{
            db_url = "jdbc:mariadb://127.0.0.1:56247/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        //}
        /*else
        {
            db_url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            db_user = "cs314-db";
            db_pass = "eiK5liet1uej";
        }*/
    }

    public static ArrayList<HashMap<String,String>> processFindServerRequest()
    {
        setServerParameters();

        try
        {
            Connection con = DriverManager.getConnection(db_url, db_user, db_pass);
            Statement query = con.createStatement();
            result = query.executeQuery(QUERY);
            int foundCounter = 0;
            while(result.next())
            {
                foundCounter++;
                location = new HashMap<>();
                location.put("name", result.getString("name"));
                location.put("municipality", result.getString("municipality"));
                location.put("id", result.getString("id"));
                location.put("type", result.getString("type"));
                location.put("latitude", result.getString("latitude"));
                location.put("longitude", result.getString("longitude"));
                allLocations.add(location);

            }
            itemsFoundMap = new HashMap<>();
            itemsFoundMap.put("itemsFound", Integer.toString(foundCounter));
            allLocations.add(itemsFoundMap);
            System.out.println(allLocations);
        }
        catch (Exception e)
        {
            System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage());
        }
        return allLocations;
    }

}
