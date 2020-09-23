package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.misc.ProcessFindRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.util.*;

public class RequestFind extends RequestHeader {

    private List<HashMap<String, String>> places = new ArrayList<>();
    private String match;
    private int limit;
    private int found;
    private ProcessFindRequest findResult;
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() {
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;

    }

    @Override
    public void buildResponse() {
        this.match = "[a-zA-z0-9_]+";
        this.limit = 5;
        this.places = findResult.processFindServerRequest();
        this.found = Integer.parseInt((places.get(places.size()-1).get("itemsFound")));
        log.trace("buildResponse -> {}", this);
    }

    public int getLimit(){
        return limit;
    }
    public String getMatch(){
        return match;
    }
    public int getFound(){
        return found;
    }
    public List<HashMap<String, String>> getPlaces(){
        return places;
    }

}