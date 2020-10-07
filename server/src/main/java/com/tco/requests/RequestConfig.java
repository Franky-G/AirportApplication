package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RequestConfig extends RequestHeader {

  private String serverName;
  private List<String> supportedRequests = new ArrayList<>();
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  public RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  @Override
  public void buildResponse() {
    this.serverName = "t10 tech10";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    this.supportedRequests = Arrays.asList("config", "distance", "find", "trip");
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public List<String> getSupportedRequests() {
    return supportedRequests;
  }
}

