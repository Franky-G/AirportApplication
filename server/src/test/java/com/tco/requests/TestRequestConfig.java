package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

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
  @DisplayName("Version number is equal to 4")
  public void testVersion() {
    int version = conf.getRequestVersion();
    assertEquals(4, version);
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
    Map<String,String[]> temp = new HashMap<>();
    temp.put("type", new String[] {"airport", "heliport", "balloonport"});
    conf = new RequestConfig(temp);
    String[] types = conf.getFilters().get("type");
    assertEquals(3, types.length);
  }

  @Test
  @DisplayName("Config Type Filter")
  public void testTypeFilterSupport() {
    Map<String,String[]> temp = new HashMap<>();
    temp.put("type", new String[] {"airport", "heliport", "balloonport"});

    conf = new RequestConfig(temp);
    String[] types = conf.getFilters().get("type");
    assertEquals("airport", types[0]);
    assertEquals("heliport", types[1]);
    assertEquals("balloonport", types[2]);
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereFilterSupport() {
    Map<String,String[]> temp = new HashMap<>();
    temp.put("where", new String[] {"Andorra"});

    conf = new RequestConfig(temp);
    String[] where = conf.getFilters().get("where");
    assertEquals("Andorra", where[0]);
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereConfigFilter() {
    Map<String,String[]> temp = new HashMap<>();
    temp.put("type", new String[] {"airport", "heliport", "balloonport"});
    temp.put("where", new String[] {"Andorra"});

    conf = new RequestConfig(temp);
    conf.buildResponse();
    Map<String, String[]> filters = conf.getFilters();
    assertTrue(filters.containsKey("type"));
    assertTrue(filters.containsKey("where"));
    assertFalse(filters.containsKey("filters"));
  }

}