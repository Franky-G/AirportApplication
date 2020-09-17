package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader {

    private String requestType; //find
    private String requestVersion;
    private String match;
    private int limit;
    private int found;

    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind() {

    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }

}