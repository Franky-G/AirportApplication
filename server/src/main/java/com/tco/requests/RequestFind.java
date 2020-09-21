package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.misc.ProcessFindRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class RequestFind extends RequestHeader {
    private ProcessFindRequest findResult;
    private String match;
    private int limit;
    private int found;

    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() {
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;

    }

    @Override
    public void buildResponse() {
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
        this.match = "[a-zA-z0-9_]+";
        this.limit = 0;
        this.found = 0;
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

}