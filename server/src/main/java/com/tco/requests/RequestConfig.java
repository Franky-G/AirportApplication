package com.tco.requests;

import com.tco.misc.ProcessFindRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

public class RequestConfig extends RequestHeader {

  private String serverName;
  private List<String> supportedRequests = new ArrayList<>();
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);
  private Map<String, String[]> filters;

  public RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  @Override
  public void buildResponse() {
    this.serverName = "t10 tech10";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    this.supportedRequests = Arrays.asList("config", "distance", "find", "trip");
    this.filters = new HashMap<>();
    String type[] = new String[3];
    type[0] = "airport";
    type[1] = "heliport";
    type[2] = "balloonport";
    this.filters.put("type", type);
    this.filters.put("where", ProcessFindRequest.getCountries());
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public List<String> getSupportedRequests() {
    return supportedRequests;
  }
}

