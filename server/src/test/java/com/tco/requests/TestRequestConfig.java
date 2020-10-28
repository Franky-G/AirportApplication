package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestConfig {

  private RequestConfig conf;

  @BeforeEach
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"config\"")
  public void testType() {
    String type = conf.getRequestType();
    assertEquals("config", type);
  }

  @Test
  @DisplayName("Version number is equal to 3")
  public void testVersion() {
    int version = conf.getRequestVersion();
    assertEquals(3, version);
  }

  @Test
  @DisplayName("Team name is t## team name")
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("t10 tech10", name);
  }

  @Test
  @DisplayName("Supported requests are [\"config\", \"distance\", \"find\", \"trip\"")
  public void testSupportedRequests(){
    List<String> temp = Arrays.asList("config", "distance", "find", "trip");
    List<String> suppReq = conf.getSupportedRequests();
    assertEquals(temp, suppReq);
  }

  @Test
  @DisplayName("Config Type Filter")
  public void testTypeFilter() {
    String[] temp = conf.getFilters().get("type");
    assertEquals(temp.length, 3);
  }

  @Test
  @DisplayName("Config Type Filter")
  public void testTypeFilterSupport() {
    String[] temp = conf.getFilters().get("type");
    assertEquals(temp[0], "airport");
    assertEquals(temp[1], "heliport");
    assertEquals(temp[2], "balloonport");
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereFilter() {
    String temp[] = conf.getFilters().get("where");
    assertEquals(temp.length, 247);
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereFilterSupport() {
    String temp[] = conf.getFilters().get("where");
    assertEquals(temp[0], "Andorra");
    assertEquals(temp[temp.length - 1], "Unknown or unassigned country");
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereConfigFilter() {
    conf.buildResponse();
    Map<String, String[]> filters = conf.getFilters();
    assertEquals(true, filters.containsKey("type"));
    assertEquals(true, filters.containsKey("where"));
    assertEquals(false, filters.containsKey("filters"));
  }

}