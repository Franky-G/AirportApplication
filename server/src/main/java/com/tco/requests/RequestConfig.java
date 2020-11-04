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
    this.filters.put("type", new String[] {"airport","heliport","balloonport"});
    this.filters.put("where", ProcessFindRequest.getWhere());
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }
  public List<String> getSupportedRequests() {
    return supportedRequests;
  }
  public Map<String, String[]> getFilters() {return filters; }
}

