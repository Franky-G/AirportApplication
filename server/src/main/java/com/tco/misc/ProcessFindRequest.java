package com.tco.misc;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ProcessFindRequest {

    private String db_url;
    private String db_user;
    private String db_pass;
    private String QUERY = "select name,municipality,id,type,latitude,longitude from world where name like 'salt%' order by name limit 5";

    private HashMap<String, String> location;
    private final ArrayList allLocations = new ArrayList<>();

    public void setServerParameters()
    {
        String hasTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        String hasTravis = System.getenv("TRAVIS");
        if (hasTravis != null && hasTravis.equals("true")) {
            this.db_url = "jdbc:mysql://127.0.0.1/cs314";
            this.db_user = "root";
            this.db_pass = null;
        }
        else if (hasTunnel != null && hasTunnel.equals("true"))
        {
            this.db_url = "jdbc:mysql://127.0.0.1:56247/cs314";
            this.db_user = "cs314-db";
            this.db_pass = "eiK5liet1uej";
        }
        else
        {
            this.db_url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            this.db_user = "cs314-db";
            this.db_pass = "eiK5liet1uej";
        }
    }

    public ArrayList<HashMap<String,String>> processFindServerRequest()
    {
        setServerParameters();
        try
        {
            Connection con = DriverManager.getConnection(this.db_url, this.db_user, this.db_pass);
            Statement query = con.createStatement();
            ResultSet result = query.executeQuery(this.QUERY);
            while(result.next())
            {
                this.location = new HashMap<>();
                this.location.put("name", result.getString("name"));
                this.location.put("municipality", result.getString("municipality"));
                this.location.put("id", result.getString("id"));
                this.location.put("type", result.getString("type"));
                this.location.put("latitude", result.getString("latitude"));
                this.location.put("longitude", result.getString("longitude"));
                this.allLocations.add(this.location);
            }
            System.out.println(this.allLocations);
        }
        catch (Exception e)
        {
            System.err.println("Exception: Can't Connect To Data Base: " + e.getMessage());
        }
        return this.allLocations;
    }

}
