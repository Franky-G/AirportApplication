package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

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
  @DisplayName("Supported requests are [\"config\", \"distance\", \"find\"")
  public void testSupportedRequests(){
    List<String> temp = Arrays.asList("config", "distance", "find");
    List<String> suppReq = conf.getSupportedRequests();
    assertEquals(temp, suppReq);
  }
}