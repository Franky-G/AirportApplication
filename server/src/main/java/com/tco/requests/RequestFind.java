package com.tco.requests;

import com.tco.misc.ProcessFindRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

public class RequestFind extends RequestHeader {

    private List<LinkedHashMap<String, String>> places = new ArrayList<>();
    private Map<String, String[]> narrow;
    private String match;
    private int limit;
    private int found;
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() {
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestFind(String matchPattern, int limitInt, Map<String,String[]> narrowFilter) {
        this();
        this.places = null;
        this.found = 0;
        this.match = matchPattern;
        this.narrow = narrowFilter;
        this.limit = limitInt;
    }

    @Override
    public void buildResponse() {
        this.places = ProcessFindRequest.processPlaces(this.match, this.limit, this.narrow);
        this.found = ProcessFindRequest.processFound(this.match, this.limit);
        log.trace("buildResponse -> {}", this);
    }

    public int getLimit(){
        return limit;
    }
    public String getMatch(){
        return match;
    }
    public int getFound(){ return found; }
    public List<LinkedHashMap<String, String>> getPlaces(){
        return places;
    }
    public Map<String,String[]> getNarrow() { return narrow; }
}