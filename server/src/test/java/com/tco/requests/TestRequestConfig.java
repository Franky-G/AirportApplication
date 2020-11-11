package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

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
    String[] temp = conf.getFilters().get("type");
    assertEquals(3, temp.length);
  }

  @Test
  @DisplayName("Config Type Filter")
  public void testTypeFilterSupport() {
    String[] temp = conf.getFilters().get("type");
    assertEquals("airport", temp[0]);
    assertEquals("heliport", temp[1]);
    assertEquals("balloonport", temp[2]);
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereFilterSupport() {
    String[] temp = conf.getFilters().get("where");
    assertEquals(29070, temp.length);
  }

  @Test
  @DisplayName("Config Where Filter")
  public void testWhereConfigFilter() {
    conf.buildResponse();
    Map<String, String[]> filters = conf.getFilters();
    assertTrue(filters.containsKey("type"));
    assertTrue(filters.containsKey("where"));
    assertFalse(filters.containsKey("filters"));
  }

}