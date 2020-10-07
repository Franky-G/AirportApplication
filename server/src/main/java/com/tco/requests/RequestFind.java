package com.tco.requests;

import com.tco.misc.ProcessFindRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

public class RequestFind extends RequestHeader {

    private List<HashMap<String, String>> places = new ArrayList<>();
    private String match;
    private int limit;
    private int found;
    private ProcessFindRequest findResult = new ProcessFindRequest();
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() {
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestFind(String matchPattern, int limitInt) {
        this();
        this.places = null;
        this.found = 0;
        this.match = matchPattern;
        this.limit = limitInt;
    }

    @Override
    public void buildResponse() {
        this.places = findResult.processPlaces(this.match, this.limit);
        this.found = findResult.processFound(this.match, this.limit);
        log.trace("buildResponse -> {}", this);
    }

    public int getLimit(){
        return limit;
    }
    public String getMatch(){
        return match;
    }
    public int getFound(){ return found; }
    public List<HashMap<String, String>> getPlaces(){
        return places;
    }

}